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
  ['odlingsmetoder/naringsvaven-i-odlingen',['/biologiskt-vaxtskydd/','/odlingsmetoder/naringsvaven-i-odlingen/']],
  ['odlingsmetoder/att-odla-med-naturen',['/biologiskt-vaxtskydd/','/odlingsmetoder/att-odla-med-naturen/']],
  ['nyttodjur',['/biologiskt-vaxtskydd/','/nyttodjur/']],
  ['nyttodjur/guldogonslandor',['/biologiskt-vaxtskydd/','/nyttodjur/','/nyttodjur/guldogonslandor/']],
  ['odlingsmetoder/jord-och-kompost',['/biologisk-odling/','/odlingsmetoder/jord-och-kompost/']],
  ['odlingsmetoder/jordens-sma-arbetare',['/biologisk-odling/','/odlingsmetoder/jordens-sma-arbetare/']],
  ['chilisorter/habanero',['/chili/','/chilisorter/','/chilisorter/habanero/']],
  ['skadedjur/bladloss',['/biologiskt-vaxtskydd/','/skadedjur/','/skadedjur/bladloss/']],
  ['produkter-2026/habanero-lemon',['/produkter-2026/','/produkter-2026/habanero-lemon/']],
  ['chilifortplantning',['/chili/','/chilifortplantning/']]
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

test('nyttodjursseriens 13 sidor har rätt SEO-hierarki', async () => {
 const slugs=['blomflugor','bladlusgallmygga','parasitsteklar','rovskinnbaggar','jordlopare',
 'rovtrips','minerarflugeparasitoid','rovkvalster-spinn','jordlevande-rovkvalster',
 'nematoder','rovkvalster-trips','guldogonslandor','nyckelpigor'];
 for(const id of slugs){
  const page=await html('nyttodjur/'+id);
  const crumb=schemas(page).find(s=>s['@type']==='BreadcrumbList');
  assert.ok(crumb,'Saknar navigering för '+id);
  assert.deepEqual(crumb.itemListElement.map(x=>new URL(x.item).pathname),[
   '/biologiskt-vaxtskydd/','/nyttodjur/','/nyttodjur/'+id+'/'
  ]);
 }
});

test('skadedjursseriens 15 sidor har rätt SEO-hierarki', async () => {
 const slugs=['bladloss','grona-bladloss','svarta-bladloss','kalbladlus',
  'trips','spinnkvalster','mjolloss','sorgmyggor','minerarflugor',
  'rovfjaril','stor-kalfjaril','kalmal','kalfly','bredkvalster','skoldloss'];
 for(const id of slugs){
  const page=await html('skadedjur/'+id);
  const breadcrumb=schemas(page).find(x=>x['@type']==='BreadcrumbList');
  assert.ok(breadcrumb,'Saknar SEO-navigering för '+id);
  assert.deepEqual(breadcrumb.itemListElement.map(x=>new URL(x.item).pathname),[
   '/biologiskt-vaxtskydd/','/skadedjur/','/skadedjur/'+id+'/'
  ]);
 }
});

test('indexeringsrapportens innehållssidor har korrekta signaler i byggningen', async () => {
 const routes = [
  'chilifortplantning',
  'chilisorter/sipka-zitronen',
  'chilisorter/okrasny-zvonek-red',
  'produkter-2026/ghost',
  'produkter-2026/rod-glod',
  'projekt/plantskola',
  'projekt/foradling',
  'projekt/modulart-vaxthus',
  'projekt/chiliodling',
 ];
 const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
 for (const route of routes) {
  const page = await html(route);
  const url = 'https://www.tradgardsdrommar.se/' + route + '/';
  assert.ok(page.includes('rel="canonical" href="' + url + '"'), 'Felaktig canonical: ' + route);
  assert.doesNotMatch(page, /<meta[^>]*noindex/i, 'Oavsiktlig noindex: ' + route);
  assert.ok(sitemap.includes('<loc>' + url + '</loc>'), 'Saknas i sitemap: ' + route);
 }
});

test('projektöversikten är länkad från en publicerad sida', async () => {
 const about = await html('om');
 assert.match(about, /<a[^>]+href="\/projekt\/"/);
 const projects = await html('projekt');
 assert.match(projects, /href="\/projekt\/plantskola\/"/);
 assert.match(projects, /href="\/projekt\/chiliodling\/"/);
});

test('ta vara på skörden har en samlingssida och en länkad fermenteringsartikel', async () => {
 const settings = JSON.parse(await readFile('src/data/settings.json', 'utf8'));
 assert.ok(settings.navigation.some(x => x.label === 'Ta vara på skörden' && x.href === '/foradla/'));
 const hub = await html('foradla');
 assert.match(hub, /Ta vara på skörden/);
 assert.match(hub, /href="\/fermentering\/"/);
 assert.match(hub, /Frysning och torkning/);
 const article = await html('fermentering');
 assert.match(article, /mjölksyrabakterier/i);
 const breadcrumb = schemas(article).find(x => x['@type'] === 'BreadcrumbList');
 assert.ok(breadcrumb);
 assert.deepEqual(breadcrumb.itemListElement.map(x => new URL(x.item).pathname), ['/foradla/', '/fermentering/']);
 const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
 assert.match(sitemap, /https:\/\/www\.tradgardsdrommar\.se\/fermentering\//);
});
