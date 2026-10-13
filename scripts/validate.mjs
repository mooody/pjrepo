import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import YAML from 'yaml';
import { z } from 'astro/zod';
const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const settings = await readJson('src/data/settings.json');
const internal = z.string().regex(/^\/(?:[a-z0-9-]+\/)*$/);
const processedImage = z.union([
  z.literal(''),
  z.string().regex(/^\/media\/[a-z0-9-]+\.webp$/),
]);
z.object({
  name: z.string().min(1),
  tagline: z.string(),
  description: z.string(),
  url: z.url().startsWith('https://'),
  email: z.union([z.literal(''), z.email()]),
  logo: processedImage,
  social: z.array(
    z.object({ label: z.string(), url: z.url().startsWith('https://') }),
  ),
  navigation: z.array(z.object({ label: z.string(), href: internal })),
  colors: z
    .object({
      earth: z.string(),
      olive: z.string(),
      sand: z.string(),
      terracotta: z.string(),
      sage: z.string(),
    })
    .refine(
      (c) => Object.values(c).every((v) => /^#[a-fA-F0-9]{6}$/.test(v)),
      'Färger måste anges som #RRGGBB',
    ),
  watermark: z.object({
    text: z.string(),
    opacity: z.number().min(0.15).max(1),
    logo: z.string(),
  }),
}).parse(settings);
const images = (await readJson('src/data/images.json')).images;
const imageIds = new Set(images.map((i) => i.id));
const home = await readJson('src/data/home.json');
for (const field of [
  'eyebrow',
  'title',
  'intro',
  'philosophyTitle',
  'philosophy',
  'chiliTitle',
  'chiliText',
])
  if (typeof home[field] !== 'string' || !home[field].trim())
    throw new Error(`Startsidan saknar ${field}`);
function imageExists(id) {
  if (id && !imageIds.has(id))
    throw new Error(`Bild-ID saknas i bildbiblioteket: ${id}`);
}
imageExists(home.heroImage);
for (const file of [settings.logo])
  if (file)
    imageExists(
      file
        .split('/')
        .at(-1)
        .replace(/\.webp$/, ''),
    );
for (const id of home.featuredChilies) {
  const text = await readFile(
    resolve('src/content/chilies', `${id}.md`),
    'utf8',
  );
  const data = YAML.parse(text.split(/^---\s*$/m)[1]);
  if (data.draft) throw new Error(`Utvald chilisort är ett utkast: ${id}`);
}
for (const directory of await readdir('src/content')) {
  for (const file of await readdir(`src/content/${directory}`)) {
    if (!file.endsWith('.md')) continue;
    const text = await readFile(`src/content/${directory}/${file}`, 'utf8');
    const data = YAML.parse(text.split(/^---\s*$/m)[1]);
    if (data.draft) continue;
    imageExists(data.image);
    for (const item of data.gallery || []) imageExists(item.image);
    if (/private-images[\/]/.test(text))
      throw new Error(`Originalbild får inte länkas i innehåll: ${file}`);
  }
}
console.log('Inställningar, bildreferenser och startsida validerade.');
