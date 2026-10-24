import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const html=route=>readFile('dist/'+(route?route+'/':'')+'index.html','utf8');
const schemas=page=>[...page.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));

test('startsidan har tydlig titel, canonical och WebSite',async()=>{
 const text=await html('');
 assert.match(text,/<title>Chiliodling, chilisorter och förädling/);
 assert.match(text,/rel="canonical" href="https:\/\/www\.tradgardsdrommar\.se\/"/);
 assert.match(text,/property="og:site_name" content="Trädgårdsdrömmar"/);
 const web=schemas(text).find(x=>x['@type']==='WebSite');
 assert.ok(web);assert.equal(web.name,'Trädgårdsdrömmar');
 assert.equal(web.url,'https://www.tradgardsdrommar.se/');
});
test('strukturerade brödsmulor pekar till rätt sidor',async()=>{
 const cases=[
  ['biologiskt-vaxtskydd',['/','/biologiskt-vaxtskydd/']],
  ['nyttodjur',['/','/biologiskt-vaxtskydd/','/nyttodjur/']],
  ['nyttodjur/guldogonslandor',['/','/biologiskt-vaxtskydd/','/nyttodjur/','/nyttodjur/guldogonslandor/']],
  ['chilisorter/habanero',['/','/chili/','/chilisorter/','/chilisorter/habanero/']],
  ['skadedjur/bladloss',['/','/biologiskt-vaxtskydd/','/skadedjur/','/skadedjur/bladloss/']],
  ['produkter-2026/habanero-lemon',['/','/produkter-2026/','/produkter-2026/habanero-lemon/']],
  ['chilifortplantning',['/','/chili/','/chilifortplantning/']]
 ];
 for(const [route,paths] of cases){
   const data=schemas(await html(route)).find(x=>x['@type']==='BreadcrumbList');
   assert.ok(data,'BreadcrumbList saknas: '+route);
   assert.deepEqual(data.itemListElement.map(x=>new URL(x.item).pathname),paths);
   assert.deepEqual(data.itemListElement.map(x=>x.position),paths.map((_,i)=>i+1));
 }
});
test('robots och sitemap matchar canonical-domänen',async()=>{
 const robots=await readFile('dist/robots.txt','utf8');
 assert.match(robots,/Disallow: \/admin\//);
 assert.match(robots,/Sitemap: https:\/\/www\.tradgardsdrommar\.se\/sitemap-index\.xml/);
 const map=await readFile('dist/sitemap-0.xml','utf8');
 assert.match(map,/www\.tradgardsdrommar\.se\/produkter-2026\/habanero-lemon\//);
});
