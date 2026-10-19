import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const products = [
  {slug:'habanero-lemon',photo:'habanero-lemon-foto.webp'},
  {slug:'habanero-chocolate',photo:'habanero-chocolate-foto.webp'},
  {slug:'sotsyrliga-jalapenos',photo:'sotsyrliga-jalapenos-foto.webp'},
  {slug:'tradgardseld',photo:'tradgardseld-foto.webp'},
  {slug:'rod-glod',photo:'rod-glod-webbetikett.webp'}, // Produktfoto saknas i Drive ännu.
  {slug:'ghost',photo:'ghost-foto.webp'}
];

test('produktarkivet 2026 har sex produktsidor med varsin originaletikett', async () => {
  const index=await readFile('dist/produkter-2026/index.html','utf8');
  for(const {slug,photo} of products) {
    assert.ok(index.includes('/produkter-2026/'+slug+'/'),'länk saknas: '+slug);
    assert.ok(index.includes(slug+'-webbetikett.webp'),'webbetikett saknas i översikten: '+slug);
    const page=await readFile('dist/produkter-2026/'+slug+'/index.html','utf8');
    assert.ok(page.includes(photo),'produktbild/illustration saknas: '+slug);
    assert.ok(page.includes(slug+'-etikett.webp'),'originaletikett saknas: '+slug);
    assert.ok(!page.includes('src="/product-images/'+slug+'-webbetikett.webp"') || slug==='rod-glod',
      'webbetikett använd på annan detaljsida: '+slug);
  }
});

test('alla produktbilder och etiketterna är optimerade, kompletta WebP-filer', async () => {
  for(const {slug,photo} of products) {
    for(const name of new Set([photo,slug+'-etikett.webp',slug+'-webbetikett.webp'])) {
      const file='dist/product-images/'+name;
      const info=await stat(file);
      assert.ok(info.size>1000 && info.size<1_500_000,'ej rimligt optimerad: '+file);
      const bytes=await readFile(file);
      assert.equal(bytes.toString('ascii',0,4),'RIFF');
      assert.equal(bytes.toString('ascii',8,12),'WEBP');
    }
  }
});
