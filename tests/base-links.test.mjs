import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
test('preview-prefix läggs till exakt en gång och externa länkar bevaras',async t=>{
 const root=await mkdtemp(join(tmpdir(),'garden-base-'));t.after(()=>rm(root,{recursive:true,force:true}));await mkdir(join(root,'dist'));
 await writeFile(join(root,'dist/index.html'),'<a href="/blogg/">Blogg</a><img src="/pjrepo/media/a.webp"><a href="https://example.org/">Extern</a>');
 const script=resolve('scripts/base-links.mjs');
 for(let i=0;i<2;i++)execFileSync(process.execPath,[script],{cwd:root,env:{...process.env,SITE_BASE:'/pjrepo/'}});
 const html=await readFile(join(root,'dist/index.html'),'utf8');
 assert.match(html,/href="\/pjrepo\/blogg\/"/);assert.doesNotMatch(html,/pjrepo\/pjrepo/);assert.match(html,/https:\/\/example.org/);
});
