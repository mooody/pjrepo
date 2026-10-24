# SEO-granskning – Trädgårdsdrömmar

Datum: 2026-10-19. Startversion: main c213a95a5055947ba5aa2be92cd0aef08a5b8d54.
Historisk startstatus 2026-10-19: ändringarna fanns då endast i en separat SEO-branch.

**Aktuell status 2026-10-20:** SEO-PR #12 är mergad till `main` (commit `ed93c527c913a7f0b2951d522f59a3c50f277d5f`). `Validate and build` på main ([#39398262747](https://github.com/mooody/pjrepo/actions/runs/39398262747)) och manuell STRATO-publicering ([#39398885483](https://github.com/mooody/pjrepo/actions/runs/39398885483)) är godkända. Siffror från Search Console och direkt HTTP-verifiering av live-domänen har inte granskats i denna dokumentationsuppdatering. Besöksmätning, Bing-registrering och tidigare Google-tag är framtida arbetssteg och har inte införts.

## Vad som har kontrollerats

Astro-layout, metadata, innehåll, interna länkar, robots.txt, sitemap-generering, bildoptimering, CMS-fält, PR/pipeline och projektregler. Google Search Central är referens för implementeringen.

**Begränsning:** Produktionsdomänen kunde inte hämtas från granskningsmiljön. HTTP-status, live-robots/canonical, Google-indexering, Search Console-statistik och Core Web Vitals är därför inte live-verifierade. Ett grönt bygge är inte bevis på indexering.

## Redan fungerande SEO-funktioner i koden

- HTML renderas statiskt, språket anges som svenska, titlar och metabeskrivningar finns per sidtyp.
- Canonical, delningsdata och automatiskt genererad sitemap finns.
- Robots.txt hänvisar till sitemap och spärrar administrationen för crawlers.
- Responsiva bilder har alt-texter och komprimerade WebP-varianter; originalflödet är skyddat.
- Preview och produktion hålls skilda med manuell produktionspublicering.

## Genomfört i arbetsbranchen

- Tydligare startsidetitel om chiliodling, chilisorter och förädling, samt sökrelevant metabeskrivning.
- WebSite JSON-LD på startsidan för webbplatsnamnet; BreadcrumbList på befintliga hierarkiska sidor.
- Open Graph site_name och locale samt Twitter Card. Detta hjälper i första hand delningar, inte direkt Google-rankning.
- Beskrivande titlar/metabeskrivningar för utvalda produkt-, chili-, nytto- och skadedjurssidor och bättre ämnespresentationer.
- Fördjupat innehåll om odling av chili i Sverige och bladlöss. Naturliga interna länkar till befintliga sidor.
- Ett Node-test av sidtitlar, strukturerad data, URL:er, sitemap och robots.

## Rekommendationer som inte kräver CMS-förändringar

| Prioritet | Åtgärd | Effekt |
| --- | --- | --- |
| Hög | Verifiera sajten i Google Search Console och skicka in https://www.tradgardsdrommar.se/sitemap-index.xml | Visar indexeringsfel, faktiska sökord, visningar och klick. Inte en rankningsgaranti. |
| Hög | Kontrollera live 200/301/404, HTTPS, www kontra apex, robots och canonical | Avslöjar tekniska indexeringshinder. Serverändringar kräver eget godkännande. |
| Hög | Använd Search Console-data till att prioritera användbara guider och unika sökavsikter | Kan ge bättre matchning mellan innehåll och besökarnas frågor. |
| Medel–hög | Bygg ut guider om svensk chiliodling, övervintring, växthus/friland och nyttodjur | Innehållsvärde viktigare än mängden SEO-taggar. |
| Medel | Fler relevanta interna länkar i text och befintligt related-fält | Underlättar navigering och upptäckt av undersidor. |
| Medel | Verifiera verklig PageSpeed/Core Web Vitals på mobil | Hjälper oss hitta faktiska prestandaproblem före kodändring. |
| Medel | Lägg till korrekt offentlig kontaktinformation när verksamheten är redo | Bättre transparens och besökarförtroende. |

## CMS-förbättringar vi uttryckligen INTE gör utan godkännande

Projektreglerna skyddar samlingar, formulärfält, bildrelationer, schemas och publiceringsflöden. Följande är endast framtida förslag:

| Möjlig CMS-ändring | SEO-nytta | Alternativ utan CMS-ändring | Bedömning |
| --- | --- | --- | --- |
| Valfritt separat SEO-titelfält utöver sidrubriken | Ibland mer träffsäker söktitel; ingen egen rankingbonus | Befintligt title-fält räcker; undantag kan lösas i aktuell Astro-mall | Avvakta |
| Unik OG-bild och delningstext per sida | Främst klick vid social delning, inte Google-rankning direkt | Befintlig global delningsbild och description | Låg prioritet |
| SEO-varningar inne i CMS för korta/dubbla beskrivningar | Hjälper redaktören undvika misstag | Test/rapport i GitHub Actions med nuvarande data | Föredra tester |
| Redigerbart lastmod/dateModified för alla sidor | Kan beskriva verkliga innehållsändringar, men falska datum är skadliga | Återanvänd befintliga date/reviewed där semantiken passar; annars inget datum | Avvakta |
| Extra Product/Offer-fält för pris, lager, recensioner | Kan ge produktfunktioner när Google-kraven uppfylls | Fortsätt med faktiska produkttexter/bilder, utan påhittade erbjudanden | Avvakta tills webbshop finns |
| Ny taxonomi eller automatiska relaterade-artiklar-fält | Främst enklare redaktionell internlänkning | Befintligt related-fält och vanliga textlänkar | Behövs inte nu |
| Ny uppladdningsväg med automatisk alt/SEO-bild | Kan underlätta bildbeskrivningar men riskera att kringgå skyddet för originalfoton | Befintliga alt-fält, manifest, vattenstämplar och WebP-pipeline | Rör inte nu |

**Slutsats:** De viktigaste SEO-förbättringarna kan uppnås utan CMS-ombyggnad. Mät faktiskt indexeringsläge och utveckla innehållet innan fler fält införs.

## Källor och verifiering

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Site names: https://developers.google.com/search/docs/appearance/site-names
- Google BreadcrumbList: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Google canonical: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Search Console: https://search.google.com/search-console
- Test av strukturerad data: https://search.google.com/test/rich-results och https://validator.schema.org/

Den ursprungliga granskningen påverkade inte VPS, Nginx, CMS, OAuth, säkerhet, bildpipeline eller deployflöde. Efterföljande PR-merge, tester och godkänd manuell publicering redovisas i statusrutan ovan. Alla framtida produktionspubliceringar kräver fortfarande separat uttryckligt godkännande.

## Faktiskt verifieringsresultat

GitHub Actions Validate and build, körning 39260913328, avslutades med **success** för SEO-branchen den 19 oktober 2026. Kontrollerna inkluderar npm ci, npm run verify, Astro-byggning, Node-tester, nya SEO-tester och Playwright. Det verifierar arbetsbranchens bygge men inte skarp indexering eller publicering. Körningen: https://github.com/mooody/pjrepo/actions/runs/39260913328
