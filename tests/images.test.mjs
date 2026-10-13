import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, mkdir, readdir, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { processImages } from '../scripts/images.mjs';
const settings = {
  watermark: { text: 'Trädgårdsdrömmar', opacity: 0.65, logo: '' },
};
const image = {
  id: 'test-image',
  source: 'source.png',
  ownership: 'own',
  alt: 'Testbild',
  photographer: 'Testfotograf',
};
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'garden-images-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const inputDir = join(root, 'input');
  const outputDir = join(root, 'output');
  await mkdir(inputDir);
  await sharp({
    create: { width: 1800, height: 1200, channels: 3, background: '#405030' },
  })
    .png()
    .toFile(join(inputDir, 'source.png'));
  return { root, inputDir, outputDir, settings };
}
test('egna bilder förminskas, får inbränd vattenstämpel och publiceras utan original', async (t) => {
  const f = await fixture(t);
  await processImages({ ...f, images: [image] });
  assert.deepEqual(await readdir(f.outputDir), ['test-image.webp']);
  const result = sharp(join(f.outputDir, 'test-image.webp'));
  const meta = await result.metadata();
  assert.equal(meta.width, 1600);
  assert.equal(meta.exif, undefined);
  const { data, info } = await result
    .raw()
    .toBuffer({ resolveWithObject: true });
  let bright = 0;
  for (let y = info.height - 100; y < info.height; y++)
    for (let x = info.width - 700; x < info.width; x++)
      if (data[(y * info.width + x) * info.channels] > 100) bright++;
  assert.ok(bright > 100, 'textens ljusa pixlar ska finnas i nederkant');
});
test('tredjepartsbilder kräver licens och får ingen företagsvattenstämpel', async (t) => {
  const f = await fixture(t);
  const third = { ...image, ownership: 'third-party' };
  await assert.rejects(processImages({ ...f, images: [third] }), /Licens/);
  await processImages({
    ...f,
    images: [
      {
        ...third,
        license: 'CC BY 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      },
    ],
  });
  const { data } = await sharp(join(f.outputDir, 'test-image.webp'))
    .raw()
    .toBuffer({ resolveWithObject: true });
  assert.ok(Math.max(...data.subarray(data.length - 3000)) < 110);
});
test('bildvägar utanför skyddad katalog stoppas, även symlänkar', async (t) => {
  const f = await fixture(t);
  await sharp({
    create: { width: 10, height: 10, channels: 3, background: 'white' },
  })
    .png()
    .toFile(join(f.root, 'outside.png'));
  await assert.rejects(
    processImages({ ...f, images: [{ ...image, source: '../outside.png' }] }),
    /private-images/,
  );
  await symlink(join(f.root, 'outside.png'), join(f.inputDir, 'link.png'));
  await assert.rejects(
    processImages({ ...f, images: [{ ...image, source: 'link.png' }] }),
    /private-images/,
  );
});
test('logotyp vattenstämplas och tomt varumärke stoppas', async (t) => {
  const f = await fixture(t);
  await sharp({
    create: { width: 160, height: 40, channels: 4, background: '#ffffff' },
  })
    .png()
    .toFile(join(f.inputDir, 'logo.png'));
  await processImages({
    ...f,
    settings: { watermark: { ...settings.watermark, logo: 'logo.png' } },
    images: [image],
  });
  assert.equal((await readdir(f.outputDir)).length, 1);
  await assert.rejects(
    processImages({
      ...f,
      settings: { watermark: { text: '', opacity: 0.6, logo: '' } },
      images: [image],
    }),
    /vattenstämpeltext/,
  );
});
