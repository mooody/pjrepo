import { readFile, mkdir, rm, realpath } from 'node:fs/promises';
import { resolve, relative, isAbsolute } from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const escapeXml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[c],
  );
export async function protectedPath(directory, file) {
  const base = await realpath(directory);
  const path = await realpath(
    resolve(base, file.replace(/^\/?private-images\//, '')),
  );
  const rel = relative(base, path);
  if (rel.startsWith('..') || isAbsolute(rel))
    throw new Error('Bildens sökväg måste ligga i private-images.');
  return path;
}
export async function processImages({ images, settings, inputDir, outputDir }) {
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
  const seen = new Set();
  for (const image of images) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(image.id) || seen.has(image.id))
      throw new Error(
        'Bild-ID måste vara unikt och bestå av små bokstäver, siffror och bindestreck.',
      );
    seen.add(image.id);
    if (!image.alt?.trim() || !image.photographer?.trim())
      throw new Error(`Alt-text och fotograf saknas: ${image.id}`);
    if (!['own', 'third-party'].includes(image.ownership))
      throw new Error(`Ogiltig ägare: ${image.id}`);
    if (
      image.ownership === 'third-party' &&
      (!image.license || !image.licenseUrl || !URL.canParse(image.licenseUrl))
    )
      throw new Error(`Licens med URL saknas: ${image.id}`);
    const source = await protectedPath(inputDir, image.source);
    const buffer = await sharp(source, { limitInputPixels: 50000000 })
      .rotate()
      .resize({
        width: 1600,
        height: 1600,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toBuffer();
    const meta = await sharp(buffer).metadata();
    const width = meta.width;
    const height = meta.height;
    const composite = [];
    if (image.ownership === 'own') {
      const opacity = settings.watermark.opacity;
      if (!(opacity >= 0.15 && opacity <= 1))
        throw new Error('Vattenstämpelns transparens måste vara 0.15–1.');
      const margin = Math.max(6, Math.round(width * 0.025));
      if (settings.watermark.logo) {
        const logo = await protectedPath(inputDir, settings.watermark.logo);
        const mark = await sharp(logo)
          .resize({
            width: Math.max(10, Math.round(width * 0.2)),
            height: Math.max(10, Math.round(height * 0.15)),
            fit: 'inside',
          })
          .ensureAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true });
        for (let i = 3; i < mark.data.length; i += 4)
          mark.data[i] = Math.round(mark.data[i] * opacity);
        composite.push({
          input: await sharp(mark.data, { raw: mark.info }).png().toBuffer(),
          left: width - mark.info.width - margin,
          top: height - mark.info.height - margin,
        });
      } else {
        const text = settings.watermark.text?.trim();
        if (!text)
          throw new Error(
            'Egna bilder kräver vattenstämpeltext eller logotyp.',
          );
        const font = Math.max(
          6,
          Math.min(width * 0.035, width / (text.length * 0.65)),
        );
        const mark = Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><text x="${width - margin}" y="${height - margin}" text-anchor="end" font-family="DejaVu Sans, sans-serif" font-size="${font}" fill="white" stroke="#241f1a" stroke-width="${Math.max(0.5, font * 0.07)}" paint-order="stroke" opacity="${opacity}">${escapeXml(text)}</text></svg>`,
        );
        composite.push({ input: mark });
      }
    }
    await sharp(buffer)
      .composite(composite)
      .webp({ quality: 82 })
      .toFile(resolve(outputDir, `${image.id}.webp`));
  }
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const manifest = JSON.parse(
    await readFile(resolve(root, 'src/data/images.json'), 'utf8'),
  );
  const settings = JSON.parse(
    await readFile(resolve(root, 'src/data/settings.json'), 'utf8'),
  );
  if (
    process.env.CI &&
    manifest.images.length &&
    process.env.REPOSITORY_PRIVATE !== 'true'
  )
    throw new Error(
      'Bildoriginal kräver ett privat repository. Kontrollera repositoryts synlighet före uppladdning.',
    );
  await processImages({
    images: manifest.images,
    settings,
    inputDir: process.env.IMAGE_SOURCE_DIR || resolve(root, 'private-images'),
    outputDir: resolve(root, 'public/media'),
  });
  console.log(
    `${manifest.images.length} bilder bearbetade; endast webbversioner publiceras.`,
  );
}
