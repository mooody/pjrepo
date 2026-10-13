import { readdir, copyFile, mkdir } from 'node:fs/promises';
const target = new URL('../public/admin/vendor/', import.meta.url);
await mkdir(target, { recursive: true });
const source = new URL('../node_modules/decap-cms/dist/', import.meta.url);
for (const file of await readdir(source)) {
  if (!file.endsWith('.map') && !file.endsWith('.cms.js') && file !== 'cms.js')
    await copyFile(new URL(file, source), new URL(file, target));
}
console.log('Decap kopierat från låst npm-paket till lokala admin-filer.');
