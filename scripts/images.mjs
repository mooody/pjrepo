import { readFile, writeFile, mkdir, rm, realpath, copyFile } from 'node:fs/promises';
import { resolve, relative, isAbsolute } from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const escapeXml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
export async function protectedPath(directory, file) {
  const base = await realpath(directory);
  const path = await realpath(resolve(base, file.replace(/^\/?private-images\//, '')));
  const rel = relative(base, path);
  if (rel.startsWith('..') || isAbsolute(rel)) throw new Error('Bildens sökväg måste ligga i private-images.');
  return path;
}
async function marked(buffer, image, settings, inputDir) {
  if (image.ownership !== 'own' || image.kind === 'brand') return sharp(buffer).webp({quality:82}).toBuffer();
  const {width,height} = await sharp(buffer).metadata();
  const {text,opacity,logo} = settings.watermark;
  if (!(opacity >= .15 && opacity <= 1)) throw new Error('Ogiltig opacitet.');
  const margin = Math.max(6,Math.round(width*.025));
  let mark;
  if (logo) {
    const path = await protectedPath(inputDir,logo);
    const result = await sharp(path).resize({width:Math.max(10,Math.round(width*.2)),height:Math.max(10,Math.round(height*.15)),fit:'inside'}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    for(let i=3;i<result.data.length;i+=4) result.data[i]=Math.round(result.data[i]*opacity);
    mark={input:await sharp(result.data,{raw:result.info}).png().toBuffer(),left:width-result.info.width-margin,top:height-result.info.height-margin};
  } else {
    if(!text?.trim()) throw new Error('Egna bilder kräver vattenstämpeltext eller logotyp.');
    const font=Math.max(6,Math.min(width*.033,width/(text.length*.65)));
    mark={input:Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><text x="${width-margin}" y="${height-margin}" text-anchor="end" font-family="DejaVu Sans, sans-serif" font-size="${font}" fill="white" stroke="#241f1a" stroke-width="${Math.max(.5,font*.07)}" paint-order="stroke" opacity="${opacity}">${escapeXml(text)}</text></svg>`)};
  }
  return sharp(buffer).composite([mark]).webp({quality:82}).toBuffer();
}
export async function processImages({images,settings,inputDir,outputDir}) {
  // This function is an explicit private-source export. Ordinary public builds only copy web assets.
  await rm(outputDir,{recursive:true,force:true});await mkdir(outputDir,{recursive:true});
  const result=[];const seen=new Set();
  for(const image of images) {
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(image.id)||seen.has(image.id)) throw new Error('Ogiltigt eller dubbelt bild-ID.');
    seen.add(image.id);
    if(!image.alt?.trim()||!image.photographer?.trim()) throw new Error(`Alt-text och fotograf saknas: ${image.id}`);
    if(!['own','third-party'].includes(image.ownership)) throw new Error('Ogiltig ägare');
    if(image.ownership==='third-party'&&(!image.license||!image.licenseUrl||!URL.canParse(image.licenseUrl))) throw new Error('Licens med URL saknas');
    const source=await protectedPath(inputDir,image.source);
    const oriented=await sharp(source,{limitInputPixels:50000000}).rotate().toBuffer();
    const metadata=await sharp(oriented).metadata();
    const groups={full:[],card:[],hero:[],sharing:[]};
    for(const [kind,widths] of Object.entries({full:[480,800,1600],card:[480,800],hero:[480,800],sharing:[1200]})) {
      for(const width of widths) {
        const aspect=kind==='card'?1.5:kind==='hero'?.8:kind==='sharing'?1.905:null;
        // Fixed-size crops may not enlarge an original. Every crop is marked AFTER cropping.
        const actual=Math.min(width,metadata.width,aspect?Math.floor(metadata.height*aspect):metadata.width);
        const height=aspect?Math.round(actual/aspect):undefined;
        const cropped=await sharp(oriented).resize({width:actual,height,fit:aspect?'cover':'inside',position:image.position||'centre',withoutEnlargement:true}).toBuffer();
        const web=await marked(cropped,image,settings,inputDir);
        const info=await sharp(web).metadata();
        const file=kind==='full'&&width===1600?`${image.id}.webp`:`${image.id}-${kind}-${width}.webp`;
        await writeFile(resolve(outputDir,file),web);
        groups[kind].push({file,width:info.width,height:info.height});
      }
    }
    result.push({id:image.id,ownership:image.ownership,position:image.position||'centre',variants:groups});
  }
  await writeFile(resolve(outputDir,'index.json'),JSON.stringify({watermark:settings.watermark,images:result},null,2)+'\n');
  return result;
}
async function copyPublished() {
  const manifest=JSON.parse(await readFile(resolve(root,'src/data/images.json'),'utf8'));
  const index=JSON.parse(await readFile(resolve(root,'web-images/index.json'),'utf8'));
  const settings=JSON.parse(await readFile(resolve(root,'src/data/settings.json'),'utf8'));
  if(JSON.stringify(index.watermark)!==JSON.stringify(settings.watermark)) throw new Error('Vattenstämpeln har ändrats. Skapa en ny skyddad bildexport.');
  const output=resolve(root,'public/media');
  await rm(output,{recursive:true,force:true});await mkdir(output,{recursive:true});
  const copied=new Set();
  for(const image of manifest.images) {
    if(image.source) throw new Error('Publik byggning får inte innehålla originalsökvägar. Använd den skyddade exporten.');
    const exported=index.images.find(i=>i.id===image.id);
    if(exported && (exported.ownership!==image.ownership || exported.position!==(image.position||'centre'))) throw new Error('Bildens ägare eller beskärning har ändrats. Skapa en ny skyddad bildexport.');
    if(!exported) throw new Error(`Webbexport saknas: ${image.id}`);
    for(const group of Object.values(exported.variants)) for(const variant of group) {
      if(!/^[a-z0-9-]+\.webp$/.test(variant.file)) throw new Error('Ogiltig webbfil');
      const path=await protectedPath(resolve(root,'web-images'),variant.file);
      const info=await sharp(path).metadata();
      if(info.format!=='webp'||info.exif||info.width!==variant.width||info.height!==variant.height) throw new Error(`Ogiltig webbexport: ${variant.file}`);
      if(!copied.has(variant.file)) {await copyFile(path,resolve(output,variant.file));copied.add(variant.file);}
    }
  }
  console.log(`${manifest.images.length} bilder kopierade från vattenstämplade webbexporter. Inga original används.`);
}
if(process.argv[1]===fileURLToPath(import.meta.url)) await copyPublished();
