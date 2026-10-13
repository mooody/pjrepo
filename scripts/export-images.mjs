// Explicit local operation: source directories are never committed or uploaded by this script.
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {processImages} from './images.mjs';
const [manifestPath,inputDir]=process.argv.slice(2);
if(!manifestPath||!inputDir) throw new Error('Använd: node scripts/export-images.mjs /skyddad/exportmanifest.json /skyddad/originalkatalog');
const {images}=JSON.parse(await readFile(resolve(manifestPath),'utf8'));
const settings=JSON.parse(await readFile('src/data/settings.json','utf8'));
await processImages({images,settings,inputDir:resolve(inputDir),outputDir:resolve('web-images')});
console.log('Webbexport klar. Originalkatalog och exportmanifest ska stanna i skyddad lagring.');
