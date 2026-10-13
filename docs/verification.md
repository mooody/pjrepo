# Verifiering av första versionen

Utförd 13 oktober 2026 före uppladdning till GitHub, med Node.js 24.19.0, npm 11.9.0 och systemets Chromium.

## Resultat

`npm run verify` lyckades:

- Astro/TypeScript: 0 fel, 0 varningar, 0 hints.
- Inställningar, startsidans utvalda sorter och bildreferenser: validerade.
- Produktionsbyggning: 32 statiska sidor, sitemap och robots.txt.
- 10 Node-tester godkända: vattenstämpel i bildpixlar, storleksgräns, originalskydd, licenser, logotyp, kataloggränser/symlänkar, negativa innehållsscheman, null-fält från CMS, interna länkar och utkast.
- 5 Chromium-tester godkända: navigation på desktop, mobilmeny/tangentbord, mobil utan horisontell överströmning, sökning/filter/tomma träffar, faktasida och Decaps GitHub-inloggningsvy.
- Axe hittade inga tillgänglighetsfel på de testade sidorna: startsidan, kontakt på mobil och bladlöss. Det ersätter inte fullständig manuell tillgänglighetsgranskning.
- Startsidan granskad visuellt i desktop- och mobilstorlek.
- Publiceringsskriptet klarar `bash -n`; ingen överföring till VPS har utförts.

## Avgränsningar

- GitHub OAuth-login, tokenutfärdande och CMS-skrivning kräver att användaren först konfigurerar sin OAuth-app och förmedlare. Endast laddning av Decap och inloggningsvyn har testats.
- Nginx, HTTPS, SSH-publicering och rollback har förberetts men inte körts på en server.
- Bildbehandlingen testades med syntetiska testbilder. Inga egna fotografier finns i projektet ännu.
- Domän, e-post, sociala länkar och OAuth-adress är ännu inte inställda.
- Startinnehållet är en introduktion. Chiliintervallen är exempelvärden som kräver sortspecifik granskning; personliga observationer och resultat saknas avsiktligt.

## Beroendekontroll

`npm audit --omit=dev` rapporterade 34 poster: 27 moderate och 7 high, inga critical. High-posterna går genom Decaps äldre Markdown-beroenden till `trim` (ReDoS, GHSA-w5p7-h5w8-2hfq); flera poster är överordnade paket i samma kedja, inte separata grundfel. Audit föreslog delvis en nedgradering av Decap, vilket inte har gjorts automatiskt.

Det officiella Decap-paketets förbyggda bundle används utan modifiering. Npm-audit analyserar beroendeträdet och visar inte säkert vilka anmärkningar som finns i just den bundlen. Därför räknas detta inte som åtgärdat genom overrides. CMS bör användas av betrodda redaktörer med betrott innehåll; uppdatera och följ Decaps upstream-releaser före skarp drift. Den publika webbplatsen använder inte Decap, React eller dess Markdown-editor; CMS-bundlen laddas endast från `/admin/`.
