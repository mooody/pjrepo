/**
 * Import 2026 product images unchanged in content and without adding watermarks.
 * Labels use high-quality WebP to keep small printed text readable.
 * Supports two legacy labels stored in Base64 chunks, reconstructed in memory.
 */
import sharp from 'sharp';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
const sourceDir=resolve('product-sources/2026');
const outputDir=resolve('public/product-images');
const slugs=['habanero-lemon','habanero-chocolate','sotsyrliga-jalapenos','tradgardseld'];
async function getOriginal(slug,kind) {
  const file=slug+'-'+kind+'.png';
  try { return await readFile(join(sourceDir,file)); }
  catch(error) {
    if(error.code!=='ENOENT') throw error;
    const partsDir=join(sourceDir,'parts');
    const files=(await readdir(partsDir)).filter(name=>name.startsWith(file+'.b64.')).sort();
    if(!files.length) throw Error('Missing image: '+file);
    const parts=await Promise.all(files.map(name=>readFile(join(partsDir,name),'utf8')));
    const buffer=Buffer.from(parts.join('').replace(/\s/g,''),'base64');
    if(buffer.length<10000 || !buffer.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))
      throw Error('Invalid reconstructed PNG: '+file);
    console.log('Reconstructed '+file+' from '+files.length+' parts');
    return buffer;
  }
}
await mkdir(outputDir,{recursive:true});
for(const slug of slugs) {
  for(const kind of ['foto','etikett']) {
    const source=await getOriginal(slug,kind);
    const meta=await sharp(source).metadata();
    if(meta.format!=='png') throw Error('Expected PNG: '+slug+' '+kind);
    const label=kind==='etikett';
    const webp=await sharp(source).rotate()
      .resize({width:label?1700:1200,withoutEnlargement:true})
      .webp({quality:label?95:84,effort:6}).toBuffer();
    const info=await sharp(webp).metadata();
    if(info.format!=='webp'||info.exif) throw Error('Invalid WebP export: '+slug+' '+kind);
    await writeFile(join(outputDir,slug+'-'+kind+'.webp'),webp);
    console.log(slug+'-'+kind+': '+Math.round(source.length/1024)+' KiB → '+Math.round(webp.length/1024)+' KiB');
  }
}
console.log('Eight complete optimized WebP files; no new watermark applied.');
