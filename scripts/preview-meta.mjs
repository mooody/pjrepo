import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
export async function markPreview(dir) {
  for(const entry of await readdir(dir,{withFileTypes:true})) {
    const path=join(dir,entry.name);
    if(entry.isDirectory()) await markPreview(path);
    else if(entry.name.endsWith('.html')) {
      const html=await readFile(path,'utf8');
      await writeFile(path,html.replace(/<head(?:\s[^>]*)?>/,'$&<meta name="robots" content="noindex,nofollow">'));
    }
  }
}
await markPreview('dist');
await writeFile('dist/robots.txt','User-agent: *\nDisallow: /\n');
await writeFile('dist/.nojekyll','');
