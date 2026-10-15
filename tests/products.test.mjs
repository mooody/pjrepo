import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const slugs = ['habanero-lemon','habanero-chocolate','sotsyrliga-jalapenos','tradgardseld'];

test('produktarkivet 2026 har översikt och fyra produktsidor', async () => {
  const index = await readFile('dist/produkter-2026/index.html', 'utf8');
  for (const slug of slugs) {
    assert.ok(index.includes('/produkter-2026/' + slug + '/'), 'länk till produkt saknas: ' + slug);
    const page = await readFile('dist/produkter-2026/' + slug + '/index.html', 'utf8');
    assert.ok(page.includes(slug + '-foto.webp'), 'produktfoto saknas: ' + slug);
    assert.ok(page.includes(slug + '-etikett.webp'), 'etikett saknas: ' + slug);
  }
});
test('varje produktbild och etikett är en enda optimerad WebP-fil', async () => {
  for (const slug of slugs) {
    for (const kind of ['foto','etikett']) {
      const path = 'dist/product-images/' + slug + '-' + kind + '.webp';
      const info = await stat(path);
      assert.ok(info.size > 1000 && info.size < 1_500_000, 'ej rimligt optimerad: ' + path);
      const file = await readFile(path);
      assert.equal(file.toString('ascii',0,4),'RIFF');
      assert.equal(file.toString('ascii',8,12),'WEBP');
    }
  }
});
