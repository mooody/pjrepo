import {readdir,readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
const base=(process.env.SITE_BASE||'').replace(/\/$/,'');
if(base) {
  async function visit(dir) {
    for(const entry of await readdir(dir,{withFileTypes:true})) {
      const path=join(dir,entry.name);
      if(entry.isDirectory()) await visit(path);
      else if(entry.name.endsWith('.html')) {
        const html=await readFile(path,'utf8');
        const output=html.replace(/\b(href|src|action|poster)=(["'])(\/(?!\/)[^"']*)\2/g,(match,key,quote,url)=>url===base||url.startsWith(`${base}/`)?match:`${key}=${quote}${base}${url}${quote}`);
        if(html!==output) await writeFile(path,output);
      }
    }
  }
  await visit('dist');
}
