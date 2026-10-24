# Ändringslogg – Trädgårdsdrömmar

## 2026-10-24 – Näringsväven i odlingen, fortsättning efter PR #27
- Godkänt: Micke bad att det avbrutna nyttodjursarbetet fortsätter utifrån befintlig artikel och beskrivning. Drive-planeringens etapp 17.5 anger näringsväven som nästa artikel. Originalarbetet, planeringen, djurupplägget och aktuell main har kontrollerats.
- Bas: PR #27 är mergad i main `05a8eb26177456e5a7936000f570fe528ba9143b`. Main-bygge 40079820401 och GitHub Pages-preview 40079820405 är avslutade med success. Öppna dokumentations-PR #14/#19 lämnas orörda. Ingen ny kontroll av STRATO-produktion ingår.
- Genomfört i `content/naringsvav-20261024`: ny artikel i befintlig methods-samling på `/odlingsmetoder/naringsvaven-i-odlingen/`. Förklarar födoväv kontra kedja, energi kontra näringsämnen, livsstadier, bladlöss/honungsdagg/myror, markliv och samspel mellan naturliga fiender. Skötselråd hänvisas till befintliga jord- och blomningsguider.
- Underlag: faktakontroll mot OpenStax, UC IPM, RHS, USDA NRCS, Colorado State University Extension och SLU CBC. Pedagogiska exempel anges som möjliga relationer, inte uppmätta förhållanden i Mickes odling. Sex källor och granskningsdatum finns i artikeln.
- Bilder: tre redan publicerade vattenstämplade webbexporter återanvänds oförändrade: odlingsmiljön från filosofiartikeln som huvudbild, eget larvfoto samt den märkta jordlivsillustrationen. Huvudbilden ersätter mallens ”Bild saknas ännu”; befintliga bildkrediter och AI-märkning används. Fotot på blomman anges uttryckligen inte visa födointag. Ingen ny artbestämning, bildexport eller ändring av original.
- Navigering: kommande-markeringen ersatt med läslänk på samlingssidan. Befintliga urval för brödsmulor, tillbakalänk och aktiv huvudmeny utökade med artikeln. Inga nya CMS-fält, scheman, tjänster eller publiceringsmetoder.
- Verifierat lokalt: npm ci, Astro-kontroll utan fel/varningar, bygge, samtliga 17 Node-tester och git diff --check. Befintliga browser-/SEO-tester utökade för artikelns meny, brödsmulor, bilder, källor, mobilbredd, tillgänglighet och utskrift. Browser-start stoppades först av saknad Chromium. Med separat testwebbläsare utanför repositoryt passerade samtliga 11 webbläsartester. Mobilskärmbild och faktisk A4-utskrift granskade visuellt. Fullständig kontroll körs om efter huvudbildstillägget; aktuellt Actions-resultat följs i PR.
- Dokumentation: PROJECT_RULES.md uppdaterad med artikelns placering och verifierad merge-status för #27; ANIMAL_ARTICLES.md kompletterad med överlämning. Serverdokumentation granskad; ingen serverändring. Ingen merge eller produktionspublicering genom detta uppdrag. Fortsatta djurartiklar och köpguide återstår.

## 2026-10-24 – Artikellogga och utskriftslayout, etapp 4 i PR #27
- Godkänt: Micke bad att ta nästa steg och behålla originalfotona tills vidare. Inget ytterligare ljusarbete utförs.
- Genomfört: gemensam ArticleTools-komponent i befintliga artikel-/sidmallar, med ”Skriv ut / spara som PDF” och en avsändarrad för utskrift. Nuvarande centrala logga återanvänds; skärmen behåller befintlig logga i sidhuvudet. Utskrift visar logga, namn och canonical-adress. Bilder inväntas innan knappens utskrift öppnas. Standardutskrift fungerar även utan JavaScript.
- Visning: print.css ger markerade artikelsidor vit bakgrund, mörk text, läsbara bilder och bildtexter, käll-URL:er, anpassade sidbrytningar och dolda navigeringsdelar. Andra sidtyper och produktmallar lämnas orörda. Befintliga foton, illustrationer och vattenstämplar oförändrade.
- Bas: PR #27 head 88edbf16 och lyckad fullständig kontroll 40075486396; aktuell main och öppna PR:er kontrolleras före införande. Ingen merge eller publicering ingår.
- Verifiering: befintlig kontroll samt test av utskriftsknapp, logga, bildladdning, ljus utskrift, källor och PDF-export. Faktiskt resultat redovisas efter körning i PR.
- Dokumentation: AGENTS.md, aktuella PROJECT_RULES.md och Drive-planering lästa. Projektregler kompletterade med artikellogga/utskrift. CMS, schema, bildmetod, server och publiceringsflöde oförändrade.

## 2026-10-24 – Egna ägg- och larvfoton, etapp 3 i PR #27
- Godkänt: Micke bad att etapp 3 genomförs i samma PR. Två egna foton införda i guldögonsländans igenkänningsavsnitt, med tydliga bildtexter, bildkrediter och länkar till hela webbversionerna. Benämningen bladluslejon tillagd för larven och kontrollerad mot Lunds universitet; ny källpost i artikeln. Ingen säker artbestämning påstås för fotona.
- Bilder: ordinarie 3:2-beskärning visar hela äggskaftet respektive larvens kropp och käkar. Tidigare larvillustration behållen som jämförelselänk, vuxenbild och livscykel oförändrade. Två manifestposter, två exportindexposter och 16 vattenstämplade WebP-filer. Bildverktygets ljusförslag underkändes eftersom små detaljer ändrades; de används inte. Exporterna kommer från originalfoton utan ljusändring. Original och AI-försök utanför repositoryt. Se docs/images.md.
- Bas: PR #27 head af5b3250, godkänd fullständig kontroll 40074616593; PR öppen och main fortsatt 6a5ab659 vid start. Öppna dokumentations-PR #14/#19 lämnas orörda.
- Verifiering: npm ci körd. Befintligt webbläsartest utökat för fyra artikelbilder, båda fotolänkarna, rätt webbexport, benämningen bladluslejon och försiktig bildbedömning. Fullständig kontroll och aktuellt CI-resultat följs före överlämning.
- Dokumentation: AGENTS.md, aktuella PROJECT_RULES.md och Drive-planeringen lästa. Projektregler granskade och oförändrade. Bilddokumentationen uppdaterad. Inga ändringar av CMS, schema, bildmetod, server eller publiceringsflöde. Ingen merge eller produktionspublicering. Logga och utskrift kvarstår som nästa etapp; ljusjustering av fotona inte genomförd.

## 2026-10-24 – Filosofiartikeln, etapp 2 i PR #27
- Godkänt: Micke bad att steg 2 byggs vidare i samma PR. Filosofiartikeln ”Att odla med naturen i stället för bredvid den” tillagd inom befintlig samling Odlingsmetoder; samlingssidan länkar nu till artikeln. Näringsväv och köpguider är fortsatt kommande.
- Redaktionellt: originalkapitlets öppning, röst och huvudresonemang bevarade. Långa växtlistor, fånggrödor och detaljerade skötselråd avgränsade till andra guider. Praktiska kompromisser, välordnade bäddar, skörd och små steg ges utrymme. Mångfald lovas inte ge automatiskt bättre bekämpning; konkurrens och predation mellan naturliga fiender nämns. Faktagranskat mot Jordbruksverket, SLU CBC, Naturvårdsverket och RHS. Jordliv förklaras närmare i redan befintlig länkad artikel.
- Bild: den befintliga, förankrade bilden i filosofikapitlet återanvänd med åtta nya vattenstämplade WebP-exporter. Märkt som AI-genererad illustration av en tänkt odlingsmiljö. Original och tillfälliga åtkomstlänkar hålls utanför repositoryt. Se docs/images.md.
- Navigering: filosofiartikeln får direkt brödsmula/tillbakalänk till Biologiskt växtskydd och aktivt menyval där. Befintliga guider behåller sina föräldrar. Ingen ny CMS-samling eller schemaändring.
- Bas: PR #27 head `06b02a05`, dess fullständiga kontroll 40074024419 godkänd; PR öppen och omergad vid start, main fortsatt `6a5ab659`. Befintliga dokumentations-PR:er lämnas orörda.
- Verifiering: npm ci körd; befintlig verifiering körs på denna ändring. Webbläsartestet utökat med artikelns navigering, laddad bild, bildtext, källor, mobilbredd och tillgänglighet; SEO-test med direkt artikelhierarki. Faktiskt CI-resultat följs i PR före överlämning.
- Dokumentation: aktuella projektregler och Drive-planering lästa; PROJECT_RULES.md kompletterad med artikelns befintliga samling och navigeringsförälder. Ingen ändring av CMS-konfiguration, schema, bildmetod, server eller publiceringsflöde. Ingen merge eller produktionspublicering. Egna insektsfoton, logga och utskrift återstår i senare etapper.

## 2026-10-24 – Biologiskt växtskydd: meny och samlingssida, etapp 1
- Godkänt: Micke bad uttryckligen att genomföra etapp 1 i Drive-planeringen. Nytt menyval efter Livet i trädgården, med fem ingångar i överenskommen ordning.
- Genomfört i arbetsgren: en vanlig CMS-redigerbar sida `src/content/pages/biologiskt-vaxtskydd.md`, länkad från `src/data/settings.json`. Skadedjur och nyttodjur använder befintliga samlingssidor och artiklar, inklusive guldögonsländor. Filosofitext, näringsväv och köpguider markeras som kommande utan brutna länkar; befintliga relevanta guider erbjuds som vidare läsning.
- Navigering: djursidor och deras listor får Biologiskt växtskydd som brödsmuleförälder. Synliga länkar leder tillbaka till den nya ingången; huvudmenyn markerar rätt område även på djursidor. Befintliga URL:er, artikeltexter och de elva guiderna under Livet i trädgården bevaras.
- Bas: main `6a5ab659`, där PR #26 är mergad. Main-kontrollen 40070708246 och Pages-körningen 40070708336 godkända. Dokumentations-PR #14 och #19 lämnas orörda.
- Verifierat lokalt: npm ci, Astro-kontroll utan fel/varningar, bygge av 55 sidor, alla 17 Node-tester samt git diff --check godkända. SEO-testets förväntade djurförälder uppdaterad till den beställda placeringen och kompletterad med nya ingången/nyttodjur. Webbläsartest tillagt för meny, läsordning, kommande texter, vägen till guldögonsländan, brödsmulor, mobilbredd och tillgänglighet. Lokala webbläsartester kan inte starta eftersom Chromium saknas; fullständig verifiering följs i PR:ens GitHub Actions.
- Mobilrättning efter första Actions-körningen 40073880441: den gamla regeln `.js nav` dolde även brödsmulorna. Dölj/öppna-regeln avgränsad till `#navigation`, samma huvudmeny som JavaScript styr. Testets synlighetskrav behålls och hela kontrollen körs om.
- Dokumentation: aktuella AGENTS.md, PROJECT_RULES.md och Drive-planeringen lästa. PROJECT_RULES.md kompletterad med beslutad navigering. CMS-konfiguration/schema, bildflöde, server och publiceringsflöde oförändrade. Ingen merge eller produktionspublicering ingår. Filosofitext/bild, foton, logga och utskrift kvarstår som egna etapper.

## 2026-10-24 – Första kompletta djurartikeln: guldögonsländor
- Godkänt: efter genomgång av Drive-materialet bad Micke att nästa steg tas med guldögonsländor som första färdiga djurartikel och förebild för fortsatt arbete.
- Genomfört i `content/guldogonslandor-artikel-20261024`: befintliga `src/content/beneficials/guldogonslandor.md` utvecklad på samma adress med kännetecken, roll, första observationer, samspel, miljö/övervintring, förenklad livscykel och kort inköpskoppling. Interna hänvisningar återanvänder befintliga guider. Arbetsanteckningar och gamla föreslagna adresser från Drive ingår inte i läsartexten.
- Faktaunderlag: individuellt Drive-utkast, samlad webbguide och bildmappens granskningsanteckningar. Kännetecken, föda och övervintring kontrollerade mot UC IPM och NIBIO. Tidsdiagrammets laboratorieexempel kontrollerat mot Huerta-de la Peña m.fl. 2023, DOI 10.29312/remexca.v14i29.3546, inklusive publicistens fulltext/tabell 2. Mått stöds även av förarbetets kompletterande INRAE- och storleksreferenser; INRAE-sidan kunde inte hämtas på nytt i denna kontroll. Vuxenliv 7–8 veckor avser honor i en studie med tre vuxenpar. Tiderna är inga svenska kalenderprognoser; exakt artbestämning utlovas inte.
- Bilder: tre befintliga AI-illustrationer från Drive återanvända. Vuxen insekt som huvudbild, äldre larv och förenklad fyrfaslivscykel som figurer i texten med länkar till större webbversioner. 24 vattenstämplade WebP-varianter genom befintlig exportfunktion. Motivbeskärning och marginaler inför export dokumenterade i `docs/images.md`; original, hämtade PNG-filer och exportkopior hålls utanför repositoryt. Ingen ny bildgenerering, ingen ändring i djuranatomi eller diagramtext.
- Bas: main `d2dbc516`, där PR #25 är mergad. Dess Validate and build [40068982690](https://github.com/mooody/pjrepo/actions/runs/40068982690) och GitHub Pages-preview [40068982740](https://github.com/mooody/pjrepo/actions/runs/40068982740) är godkända. Öppna dokumentations-PR:er #14 och #19 lämnas orörda.
- Redaktionell fortsättning: `docs/ANIMAL_ARTICLES.md` dokumenterar det genomförda upplägget och kvarstående avgränsningar för senare djurartiklar. De andra 26 djurartiklarna och den gemensamma inköpsguiden införs inte genom detta uppdrag.
- Verifiering: `npm ci`, Astro-kontroll utan fel/varningar, validering/bygge av 54 sidor samt 17 Node-tester godkända lokalt. Standardiserat browser-test tillagt för artikelns tre laddade bilder, förstoringslänk, källor, mobilbredd och tillgänglighet. Lokal `npm run verify` stannar vid browser-start eftersom Chromium saknas; fullständig kontroll körs i PR:ens Actions. Bilder, läsbar diagramtext och vattenstämpel granskade visuellt. `git diff --check` godkänd.
- Dokumentation: `AGENTS.md` och `docs/PROJECT_RULES.md` lästa och granskade; reglerna oförändrade. CMS, schema, artikelkomponent, navigationsstruktur, vattenstämpelinställningar, server och publiceringsflöde oförändrade. Ingen merge eller produktionspublicering.

## 2026-10-24 – Höstlöv som huvudbild till Täckodling genom året
- Godkänt: Micke bad att den bearbetade bilden av påbörjad lövtäckning och den föreslagna bildtexten läggs in i artikeln.
- Genomfört i separat gren: `tackodling-genom-aret.md` använder `tackodling-hostlov` som huvudbild. Bildtext: ”Höstens löv tas till vara som marktäcke. Här har arbetet med att täcka odlingsytan påbörjats.” Bildtexten anger även att fotot är digitalt bearbetat. Alt-text beskriver den påbörjade täckningen; artikelns saktext är oförändrad.
- Bilder: en ny manifestpost, en exportindexpost och åtta vattenstämplade WebP-varianter. Befintlig `processImages` använd med oförändrade inställningar i separat exportkatalog; tidigare exporter bevarade. Originalfoto och bearbetad PNG ligger utanför repositoryt. Fullbild och kortbeskärning samt vattenstämpel granskade visuellt. Bildtestets befintliga urval och förväntade kortbildsantal uppdaterade.
- Bas: main `ab83667c`, där PR #24 är mergad; dess Validate and build [39929648298](https://github.com/mooody/pjrepo/actions/runs/39929648298) och GitHub Pages-preview [39929648332](https://github.com/mooody/pjrepo/actions/runs/39929648332) är godkända. Öppna dokumentations-PR:er #14 och #19 lämnas orörda.
- Verifiering: `npm ci`, Astro-kontroll utan fel eller varningar, validering/bygge av 54 sidor, 17 Node-tester och `git diff --check` godkända. Huvudbild, godkänd bildtext och artikelkort verifierade i byggd HTML. Lokal `npm run verify` stannar vid webbläsartester eftersom Chromium saknas; PR:ens GitHub Actions kör fullständig verifiering.
- Dokumentation: `docs/images.md` uppdaterad. `AGENTS.md` och `docs/PROJECT_RULES.md` lästa och granskade; reglerna är oförändrade. Ingen ändring av CMS, schema, bildmetod, server eller publiceringsflöde. Ingen merge eller produktionspublicering ingår.
- Uppföljning av PR #25: Actions [40068097167](https://github.com/mooody/pjrepo/actions/runs/40068097167) stoppades av bildtestets antagande att alla fullbilder använder en fil med suffixet `-full-800.webp`. Höstbildens största fullversion är 1600 pixlar och heter `tackodling-hostlov.webp` enligt befintlig exportkonvention. Testet anger nu exakt publicerad fullbild per artikel; tidigare artiklars 800-pixelsfiler kontrolleras oförändrat. Inga bildfiler, komponenter eller exportregler ändras av rättningen. Ny fullständig Actions-kontroll ska godkännas före överlämning.

## 2026-10-23 – Fem fortsättningsartiklar under Livet i trädgården
- Genomfört i `content/fem-tradgardsartiklar-20261023`: fyra nya artiklar om jordförbättring, köpejord, tiden efter skörd och återanvändning av krukjord. Den befintliga arbetsmallen `blomning-genom-sasongen.md` utvecklad på samma adress. Texterna utgår från de fem Drive-utkasten och deras faktakontroll; källor och granskningsdatum finns i respektive artikel. Hänvisningar mellan utkasten har ersatts med interna läslänkar. Inga privata kursfiler eller deras Drive-länkar har lagts i repositoryt.
- Köpejord skiljer råvaror från tillsatt näring, förklarar volymminskning och jämför möjliga mervärden med pris. Ett konkret produktinnehåll återges som tillverkaruppgift; varken högre skörd, generellt bättre kvalitet eller faktiska butikspriser påstås vara visade.
- Visning: de fem artiklarna läggs i föreslagen ordning efter de sex befintliga guiderna på `biologisk-odling.astro`. Artikelmallens befintliga urval för direkta brödsmulor och tillbakalänk utökas med samma fem ID:n. Befintligt webbläsartest kontrollerar alla elva länkar, läsordning, källavsnitt och tillbakalänkar. Inga nya bilder tilldelade.
- Bas: main `8e6e3724` med PR #23 mergad. Dess Validate and build [39906325107](https://github.com/mooody/pjrepo/actions/runs/39906325107) och GitHub Pages-preview [39906324665](https://github.com/mooody/pjrepo/actions/runs/39906324665) är godkända. Öppna dokumentations-PR:er #14 och #19 lämnas orörda; denna loggpost ska bevaras vid eventuell senare konflikthantering.
- Verifierat lokalt: `npm ci`, Astro-kontroll utan fel eller varningar, validering och byggning av 54 sidor samt alla 17 Node-tester godkända. `git diff --check` godkänd. Fullständig `npm run verify` stannar vid webbläsartesterna eftersom Chromium saknas; installationsförsöket gav en felaktig nedladdningsfil. PR:ens GitHub Actions kör hela kontrollen inklusive webbläsartester.
- Dokumentation: `AGENTS.md` och `docs/PROJECT_RULES.md` lästa och granskade; reglerna är oförändrade. Ingen ändring av CMS, schema, bildhantering, server, menystruktur eller publiceringsflöde. Artiklarna är förberedda för byggning i separat arbetsgren/PR. Ingen merge eller produktionspublicering utförd.

**Omfattning:** ändringar av innehåll, kod, CMS, bilder, GitHub-workflows, OAuth, server, DNS, certifikat och publicering. Lägg en tydlig post per uppdrag/PR även när ändringen bara gäller innehåll. Granska samtidigt [PROJECT_RULES.md](PROJECT_RULES.md) och relevant dokumentation; uppdatera dem när beskrivningen eller reglerna påverkas.




## 2026-10-22 – Använd ”jordklumpar” i jordlivsartikeln
- Godkänt: Micke önskade ”jordklumpar” inom citattecken i stället för jordsmulor, med aggregat kvar som en kort förklaring.
- Genomfört: endast motsvarande stycken i `src/content/methods/jordens-sma-arbetare.md` ändrade. Texten anger att storleken kan variera; beskrivningen av sammanbundna partiklar, stabilitet och porer inuti och mellan dem behålls. Ingen bild eller annan artikel ändrad.
- Bas och status: PR #22 är mergad i main genom `7e2f0c8f`. Den versionens Validate and build [39789272474](https://github.com/mooody/pjrepo/actions/runs/39789272474) och Pages-preview [39789272476](https://github.com/mooody/pjrepo/actions/runs/39789272476) är godkända. Denna ordändring görs i en ny arbetsgren/PR utan merge eller produktionspublicering.
- Granskning av fortsatt innehåll: den aktuella Drive-planeringen jämförd med befintliga artiklar och arbetsmallar. Förslag på nästa tre är lerjord, återanvändning av krukjord och utveckling av befintlig mall för blomning genom säsongen. Endast förslag; inga nya artikeltexter har beställts eller skrivits. Drive-dokumentets äldre PR-status har inte ändrats i detta uppdrag.
- Verifiering: `git diff --check` godkänd; fullständig befintlig verifiering körs i PR:ens GitHub Actions före överlämning.
- Dokumentation: aktuella `AGENTS.md` och `docs/PROJECT_RULES.md` lästa och granskade; reglerna är oförändrade. CMS, schema, bildhantering, mallar, server och publiceringsflöden är oförändrade.

## 2026-10-22 – Förtydliga jordliv, täckodling och mykorrhiza
- Godkänt: Micke bad efter faktagenomgång att samtliga sju granskningspunkter åtgärdas, med samma lättillgängliga språk som grundartiklarna. Begreppet aggregat ska användas som förklaring, inte dominera löptexten. Detta omfattar de uttryckligen granskade styckena i två tidigare fastlagda grundartiklar.
- Genomfört i separat arbetsgren: `tackodling.md` förklarar att kväve tillfälligt binds i mikroorganismer och därför kan bli mindre tillgängligt för grödan, med skillnaden mellan yttäckning och nedblandning kvar. `biologisk-mangfald.md` ändrar ”utan insekter” till ”utan skadeinsekter”. `jordens-sma-arbetare.md` förklarar svamptrådarnas räckvidd, fosforupptag och samspel med andra mikroorganismer; preciserar höga nivåer av lättillgänglig fosfor; knyter svag tillväxt till näringsupptag och rotmiljö. Jordsmulor introduceras med fackordet aggregat i förklaringen; deras bildning, stabilitet och porer både inuti och mellan beskrivs sammanhängande. Källor och granskningsdatum uppdaterade.
- Bild: `jordliv-rot-mykorrhiza` omarbetad med ett finare nät av hyfer som sträcker sig utanför roten och tydligare märkning. Alt-text och bildtext uppdaterade. Åtta vattenstämplade webbexporter genom befintlig `processImages`; PNG-original bevaras utanför repositoryt. `docs/images.md` uppdaterad.
- Aktuell bas: main `5fda31f6`, där PR #21 är mergad. GitHub rapporterar lyckad Validate and build [39755690092](https://github.com/mooody/pjrepo/actions/runs/39755690092), Pages-preview [39755690096](https://github.com/mooody/pjrepo/actions/runs/39755690096) och separat produktionspublicering [39761647518](https://github.com/mooody/pjrepo/actions/runs/39761647518) för denna tidigare version. Ingen ny publicering görs genom detta uppdrag. Öppna dokumentations-PR:er #14 och #19 berör inte artikeländringarna och lämnas orörda.
- Verifierat lokalt: `npm ci`, Astro-kontroll utan fel eller varningar, validering och byggning av 49 sidor samt alla 17 Node-tester godkända. Bildmotiv, svensk märkning och vattenstämpel kontrollerade visuellt. `git diff --check` godkänd. Lokala webbläsartester kan inte starta eftersom Playwrights Chromium saknas; fullständig `npm run verify` körs i PR:ens GitHub Actions och resultat följs före överlämning.
- Dokumentation: aktuella `AGENTS.md` och `docs/PROJECT_RULES.md` lästa och granskade; reglerna är oförändrade. Drive-planeringen och befintlig serverdokumentation kontrollerade. Ingen ändring av CMS, schema, mallar, bildmetod, server eller publiceringsflöde.
- Status: innehåll och bild genomförda för granskning i separat arbetsgren/PR. Ingen merge eller produktionspublicering ingår.

## 2026-10-22 – Visa fortsättningsartiklarna efter grundartiklarna
- Bakgrund: PR #20 är mergad i `main` genom `85dbdbe0`; verifiering [39754323078](https://github.com/mooody/pjrepo/actions/runs/39754323078) och GitHub Pages-preview [39754323118](https://github.com/mooody/pjrepo/actions/runs/39754323118) är godkända. Artiklarna byggdes, men landningssidans fasta urval innehöll bara de tre äldre grundartiklarna.
- Godkänt: Micke bad att de tre fortsättningarna ska läggas direkt efter de tre tidigare artiklarna under Livet i trädgården.
- Genomfört i `fix/visa-sex-tradgardsguider-20261022`: `src/pages/biologisk-odling.astro` visar sex kort i ordningen jord → täckodling → biologisk mångfald → jordliv → kompost → täckodling genom året. Samma befintliga kort och rutnät används. `src/pages/[section]/[id].astro` ger även de nya artiklarna samma direkta brödsmulor och tillbakalänk till Livet i trädgården som grundartiklarna. Befintliga URL:er, artikeltexter och bilder bevaras.
- Verifiering: befintligt webbläsartest utökat med alla sex länkar, exakt läsordning, källavsnitt, brödsmulor och tillbakalänkar. Förväntat antal kortbilder är fem eftersom täckodling genom året ännu saknar en tilldelad bild. `npm ci`, Astro-kontroll, byggning av 49 sidor och alla 17 Node-tester godkända lokalt. Sex kort i rätt ordning samt brödsmulor och tillbakalänkar på samtliga sex sidor verifierade i byggd HTML. Lokala webbläsartester kan inte starta då Chromium saknas; fullständig verifiering inklusive dessa tester körs i den nya PR:en.
- Dokumentation: `docs/PROJECT_RULES.md` och `AGENTS.md` lästa och granskade; oförändrade. Ingen ändring i CMS, schema, huvudmeny, bildhantering, säkerhet eller publiceringsflöde. Ingen serverändring.
- Status: rättningen görs i separat arbetsgren/PR från aktuell main. Ingen merge eller ny publicering utförd i detta uppdrag. STRATO-produktionens aktuella version är inte verifierad här.

## 2026-10-22 – Illustrationer till jordliv och kompost i PR #20
- Godkänt: Micke beställde de två illustrationerna och bad därefter att få dem inlagda i artiklarna. Arbetet fortsätter i samma artikelgren och PR #20; ingen merge eller produktionspublicering ingår.
- Genomfört: illustrationerna `jordliv-rot-mykorrhiza` och `kompost-tre-stadier` tilldelade respektive artikel genom befintliga `image`- och `imageAlt`-fält. Bildtexter under bilderna anger att de är AI-genererade pedagogiska illustrationer; rotbilden är förenklad och inte skalenlig, kompostbilden anger inga bestämda tider. Artikelbrödtexterna och de tre tidigare grundartiklarna är oförändrade.
- Bildexport: två manifestposter i `src/data/images.json`, två exportposter i `web-images/index.json` och 16 vattenstämplade WebP-filer. Befintlig `processImages` har använts med samma vattenstämpelinställningar och format. Exporterna har inga originalmetadata; inga PNG-original eller originalsökvägar läggs i GitHub. Separata exportkopior undviker dubbel varumärkesmärkning och originalen bevaras utanför repositoryt.
- Dokumentation: `docs/images.md` uppdaterad; `docs/PROJECT_RULES.md` och `AGENTS.md` lästa och granskade, oförändrade. CMS, schema, bildfunktion, mallar, server och publiceringsflöden är oförändrade.
- Verifierat lokalt: `npm ci`, Astro-kontroll utan fel eller varningar, byggning av 49 sidor och samtliga 17 Node-tester inklusive interna bildlänkar. Bild, alt-text och illustrativ bildtext kontrollerade i de två byggda artikelsidorna. Bildmotiv och fullformat har granskats visuellt. Aktuellt CI-resultat inklusive webbläsartester för bildcommit följs i PR #20. Tidigare artikelcommit `6c92f9f` har godkänd fullständig verifiering [39742065564](https://github.com/mooody/pjrepo/actions/runs/39742065564); detta ersätter inte kontrollen av den nya bildcommiten.
- Status: genomfört i artikelgrenen för granskning. Inte mergat i main eller publicerat till GitHub Pages, STRATO-preview eller produktion. Eventuella egna fotografier till artiklarna återstår.

## 2026-10-22 – Tre fortsättningsartiklar om jordliv, kompost och täckodlingsåret
- Godkänt: Micke gav klartecken att skriva de tre fortsättningarna enligt den reviderade Drive-planeringen, med samma sakliga och lättillgängliga ton som grundartiklarna. Grundartiklarna är fastlagda utgångspunkter och lämnas oförändrade.
- Genomfört i arbetsgren `content/jordliv-kompost-tackodlingsar-20261022`: nya `src/content/methods/jordens-sma-arbetare.md` och `src/content/methods/tackodling-genom-aret.md`; befintliga `src/content/methods/kompost.md` utvecklad till en fullständig artikel på samma URL. Texterna följer kedjan jordliv → kompostens nedbrytning och användning → säsongsanpassad täckodling. Interna läslänkar och befintligt `related`-fält binder samman fortsättningarna och grundartiklarna.
- Faktagranskat 22 oktober: näringsväv, rhizosfär, mykorrhiza och markpackning mot SLU, Lunds universitet, USDA NRCS och Colorado State University Extension; kompost och praktisk täckodling mot RHS och universitetens rådgivning i Minnesota, Oregon och Iowa. Verifierade källänkar och granskningsdatum finns i respektive artikel. Råd om säsong utgår från markens och grödans tillstånd, inte importerade kalenderdatum. Inga egna försök, resultat eller erfarenheter har uppfunnits.
- Avgränsning: endast artikeltext och denna loggpost. Inga nya bilder eller bild-ID:n tilldelade. CMS, schema, mallar, landningssidans urval, server och publiceringsflöde oförändrade. `docs/PROJECT_RULES.md` och `AGENTS.md` granskade; reglerna är oförändrade och ingen driftdokumentation behöver ändras.
- Verifierat lokalt: `npm ci`, Astro-kontroll utan fel eller varningar, validering och byggning av 49 sidor samt samtliga 17 Node-tester, inklusive interna länkar. Webbläsartesterna kunde inte starta eftersom Playwrights Chromium saknades; installationsförsöket misslyckades med en ofullständig nedladdning. GitHub Actions-körningen [39741937189](https://github.com/mooody/pjrepo/actions/runs/39741937189) startades för innehållscommit `136740e2`; resultatet följs i PR #20. Efter denna commit ändras endast dokumentationen.
- Status: efter Mickes uttryckliga godkännande är artiklarna sparade i GitHub-grenen `content/jordliv-kompost-tackodlingsar-20261022` och [draft-PR #20](https://github.com/mooody/pjrepo/pull/20). Artiklarna är publiceringsbara (`draft: false`) i arbetsgrenen för att kunna byggas och granskas; detta är inte merge eller publicering. Ingen merge till `main`, ingen publicering till GitHub Pages eller STRATO utförd i uppdraget. Separat godkännande krävs före merge och produktionspublicering.
- Återstår: redaktionell granskning, eventuell senare bildsättning och godkännande för nästa steg. Resterande förslag i Drive-planeringen är fortfarande inte genomgångna mot befintligt innehåll. Öppna dokumentations-PR:er #14 och #19 behöver beaktas vid eventuell samordning av ändringsloggen.
- Överföringsstatus: lokal innehållscommit `7498b90`. Automatisk godkännandegranskning avvisade push till GitHub med motiveringen att uppdraget godkände skrivandet men inte uttryckligen fjärröverföring och destination. Ingen alternativ överföring har försökts. Micke har därefter uttryckligen godkänt överföringen till arbetsgren i `mooody/pjrepo` och PR för granskning. Överföringen genomförs via GitHub-anslutningen eftersom lokal Git saknar inloggningsuppgifter. Arbetsgrenen och PR #20 är nu skapade och verifieringen körs i GitHub Actions. Produktionspublicering ingår fortsatt inte.

## 2026-10-21 – Fördjupade trädgårdsguider och bilder under Livet i trädgården
- Syfte: vidareutveckla de tre befintliga, publiceringsbara guiderna med jordarters svagheter och rulltest, täckmaterial och svampliv, nyttodjurens relation till skadedjur samt visuellt material.
- Genomfört i arbetsgren `content/tradgardsguider-bilder-och-brodsmulor-20261021`: uppdaterade tre `src/content/methods/*.md`-artiklar i befintlig samling och utan ändrade sluggar. Rulltest och jordens vatten-/luft-/näringsfunktion förklaras med stöd av eget utbildningsmaterial i Drive (ej offentlig källa) och befintliga externa källor. Halmens kol/kvävebalans, häckklipp och samspel mellan markfukt, mycel och levande rötter förtydligas.
- Bilder: fem utvalda, redigerade/illustrerade motiv i full-, kort-, huvud- och delningsformat; 30 vattenstämplade WebP-filer, fem bild-ID:n i `src/data/images.json` och fem exportposter i `web-images/index.json`. Inga användaroriginal publicerade. Bildernas bearbetade/illustrativa karaktär framgår av bildtexterna. Befintlig bildpipeline och CMS oförändrade.
- Navigering: tre artiklar får synliga brödsmulor och samma strukturerade BreadcrumbList: Startsida → Livet i trädgården → artikeln. De behåller befintliga URL:er under `/odlingsmetoder/` och tidigare interna länkar. Startsidan för Livet i trädgården visar deras befintliga kortbilder. Ingen huvudmeny eller samlingsstruktur ändrad.
- Verifierat: nytt Playwright-test för brödsmulor, artikelbilder och kortbilder samt samtliga befintliga valideringar. GitHub Actions `Validate and build` [39582001842](https://github.com/mooody/pjrepo/actions/runs/39582001842) godkänd för kodcommit `cf017889` och [39582309131](https://github.com/mooody/pjrepo/actions/runs/39582309131) godkänd för PR:ens slutcommit `dd439d9c`. Efter användarens merge av PR #18 verifierades även `main` genom [39582768508](https://github.com/mooody/pjrepo/actions/runs/39582768508).
- Dokumentation: `docs/PROJECT_RULES.md` och `AGENTS.md` lästa och granskade; oförändrade. `docs/images.md` kompletterad; drift, server och publiceringsrutiner oförändrade.
- Status 2026-10-21: PR #18 **sammanslagen i `main`** (mergecommit `c6ac698b`). GitHub Pages-preview automatiskt **publicerad och verifierad** genom godkänd [Pages-körning 39582768636](https://github.com/mooody/pjrepo/actions/runs/39582768636). **Ingen publicering till STRATO-preview eller STRATO-produktion** har gjorts som del av uppdraget; produktion kräver separat uttryckligt godkännande.
- Återstår: redaktionell bild- och textgranskning samt fortsatt egen artikel om jordens mikroliv. Samordna `docs/CHANGELOG.md` med öppen dokumentations-PR #14 vid behov.

## 2026-10-21 – Visa tre trädgårdsguider under Livet i trädgården
- Område: innehåll och länkning i Trädgårdsdrömmars befintliga sektion `Livet i trädgården`; ny arbetsgren `content/visa-tradgardsguider-i-livet-20261021`.
- Bakgrund: PR #16 om jord, täckodling och biologisk mångfald mergades tidigare i `main`, men texterna hade fortfarande `draft: true` och uteslöts därmed från Astro och GitHub Pages trots godkänt Pages-bygge.
- Genomfört i arbetsgren: de tre befintliga `methods`-artiklarna har markerats `draft: false`. Landningssidan `src/pages/biologisk-odling.astro` visar nu länkar till de tre publiceringsbara guiderna inom `Livet i trädgården`, med samma befintliga sluggar, samling och CMS-schema. Sidans introduktion i `src/data/interface.json` har breddats till allmän trädgårdsodling. Ingen ny huvudmenypost eller CMS-struktur införs.
- Verifierat: `tests/browser/site.spec.ts` kontrollerar länkar, artikelrubriker och källavsnitt. Testet i `tests/site.test.mjs` kräver nu att alla tre guiderna byggs, medan avvecklade sidor fortsatt utesluts. GitHub Actions `Validate and build` [39561643000](https://github.com/mooody/pjrepo/actions/runs/39561643000) godkänd för kodcommit `3939a0a6`, inklusive `npm ci`, `npm run verify` och webbläsartester. Efterföljande loggjustering är endast dokumentation.
- Dokumentation: `docs/PROJECT_RULES.md` och `AGENTS.md` granskade; inga ändringar i arkitektur, driftsättning eller projektregler. Ingen serverändring.
- Status: endast arbetsgren och PR tills användaren själv väljer merge. GitHub Pages byggs automatiskt efter merge till `main`; detta är inte publicering till STRATO-produktion. För produktion krävs fortsatt separat godkännande.
- Återstår: granska utseende och text på GitHub Pages efter godkänd merge, bearbeta artiklar vidare senare; eventuell konflikt med öppen dokumentations-PR #14 i `docs/CHANGELOG.md` måste avstämmas.

## 2026-10-21 – Gemensam disposition för tio chilisorter
- Godkänt: användaren bad genomföra de gemensamt granskade artikelutkasten och mallen. Ingen merge eller produktionspublicering beställd.
- Genomfört: individuell inledning, Smak och karaktär, Odling i Sverige och Användning på tio sortsidor. Faktarutan visar bara art, ungefärlig styrka och utseende. Korta markeringar om hetta utan upprepade SHU-tal. Källor ligger kvar längst ned.
- Genomfört: verifierad personhistorik för Frank Garcia/Red Savina och Ed Currie/Reaper; borttagna egna försöksredogörelser, leverantörshänvisningar i löptext och odlarbekräftelser i bildtexter. Okrasny beskrivs som högväxande enligt MoravoSeed; obelagd sjukdomsresistens utelämnad.
- Källbedömning: sex ungefärliga SHU-intervall jämförda mot flera källor; fyra får `SHU-intervall saknas` eftersom underlaget inte räcker. Källskillnader och återstående uppgifter dokumenterade i `docs/chilisorter.md`.
- Berörda filer: tio filer i `src/content/chilies`, `src/pages/[section]/[id].astro`, `src/data/images.json`, browser-test, redaktionell dokumentation och ändringslogg. Inga bildpixlar, original eller etiketter ändrade.
- Verifierat lokalt: `npm ci`, typkontroll (0 fel/varningar), byggning och 17 tester godkända. Browserkontroll tillagd för alla tio sidor; lokalt Chromium saknas och nedladdningen returnerar ogiltig ZIP. GitHub Actions-körning `39548471896` passerade hela `npm run verify`, inklusive sex browser-tester och kontroll av alla tio sortsidor, för kodcommit `d2334d1fa6d4fc2d171cf829d9fcef7397b1e1d2`.
- Dokumentation: aktuella GitHub-regler och kompletterande Drive-serverjournal lästa; regler granskade och oförändrade. Ingen påverkan på drift eller andra webbplatser.
- Status 2026-10-21: PR #15 sammanslagen i `main` (mergecommit `88deb6a9`). `Validate and build` och GitHub Pages-preview godkända för denna mergecommit. Ingen ny produktionspublicering ingick; STRATO-publicering kräver separat godkännande.

## 2026-10-21 – Tre korta trädgårdsguider om jord, täckodling och mångfald
- Område/miljö: redaktionellt innehåll i befintlig CMS-samling `methods`; arbetsgren `content/jord-tackodling-mangfald-20261021`.
- Genomfört i arbetsgren: tidigare korta utkast i `src/content/methods/jord-och-kompost.md`, `tackodling.md` och `biologisk-mangfald.md` har byggts ut med lättlästa, praktiska introduktioner. Jordtexten beskriver sand, silt, lera och markliv; täckodlingstexten tar upp material, effekter och begränsningar; mångfaldstexten behandlar säsongsblomning, livsmiljöer och övervintring.
- Fakta: genomgång med RHS, SLU, Naturvårdsverket och Jordbruksverket. Källor och interna korslänkar lagda i befintliga fält. Samtliga tre är fortsatt `draft: true` tills användaren godkänt bearbetning/publicering.
- Dokumentation: `docs/PROJECT_RULES.md` och `AGENTS.md` granskade; reglerna behöver inte ändras. CMS-konfiguration, struktur, menyer, bildflöde och serverdrift oförändrade.
- Verifiering: frontmatter och interna länkmål granskade mot befintligt schema/kataloger. GitHub Actions `Validate and build` godkänd både på ursprunglig arbetsgren ([39552335495](https://github.com/mooody/pjrepo/actions/runs/39552335495)) och på den samordnade koden efter integrering av `main` ([39554575983](https://github.com/mooody/pjrepo/actions/runs/39554575983), commit `50c86c0b`). Den senare körningen omfattade `npm ci`, `npm run verify` och publicering av byggartefakt. Inget server- eller produktionstest utfört.
- Publicering: endast arbetsgren/PR; ej `main`, preview eller produktion.
- Konfliktlösning 2026-10-21: uppdaterad mot `main` efter merge av chili-PR #15. De separata ämnesfilerna är bevarade; båda uppdragens loggposter har förenats och placerats utanför mallens kodblock.
- Återstår: redaktionell granskning, eventuella bilder och slutredigering. Skadedjur/nyttodjur och den tidigare artikeln hanteras separat. Öppen dokumentations-PR #14 ändrar också `docs/CHANGELOG.md` och kan behöva konfliktlösas vid senare merge.

## 2026-10-19 – Chilins arter och lättlästa styrkebeskrivningar
- Genomfört: ny artikel `src/content/pages/chiliarter.md` med de fem stora odlade arterna och 38 vilda arter enligt Barboza med flera (2022). Länkad från Chili.
- Genomfört: tio sortsidor har fått lättlästa styrkebeskrivningar; ungefärliga SHU anges där underlaget räcker, annars beskrivande ord och befintlig leverantörsskala. Källspecifika testförbehåll borttagna ur lästexten. En gemensam förklaring om variation och SHU finns i sortöversikten. Styrkan visas även på sortkorten.
- Källor: artmonografin (doi:10.3897/phytokeys.200.71667), Oxford, Rutgers, NMSU och sorternas fröleverantörer; befintliga källänkar bevarade och kompletterade. Listans 38 vilda namn kontrollerade mot monografins tabell 1.
- Berörda filer: artikeln, tio filer under `src/content/chilies`, `src/pages/chili/index.astro`, `src/components/Card.astro`, `src/data/sections.json` och denna logg.
- Dokumentation: projektreglerna granskade och oförändrade. CMS, bildhantering och drift oförändrade.
- Verifiering: typkontroll, byggning och 14 tester godkända; lokala webbläsartester kunde inte starta utan Chromium. Installationsförsöket fick en ogiltig ZIP från nedladdningskällan. GitHub Actions återstår.
- Status: arbetsgren/PR, inte publicerat. Återstår: granskning och merge; produktion kräver separat godkänd publicering.

## 2026-10-19 – Ta bort avsnittet om fröfria chilifrukter
- Genomfört: hela avsnittet ”Kan chili få frukter utan frön?” borttaget från `src/content/pages/chilifortplantning.md`. Efterföljande avsnitt omnumrerat från 7 till 6.
- Syfte: avgränsad innehållsändring enligt användarens önskemål.
- Dokumentation: projektreglerna granskade och oförändrade; ingen ändring av CMS, bilder eller drift.
- Verifiering: `npm ci`, typkontroll, byggning och 14 tester godkända. Lokala webbläsartester kunde inte starta eftersom Playwrights Chromium saknas; GitHub Actions återstår.
- Status: arbetsgren/PR; inte publicerat. Återstår: granskning, merge och separat godkänd produktionspublicering.

**Mall för varje ny ändring:**

```md
## ÅÅÅÅ-MM-DD – Kort rubrik
- Område/miljö: [innehåll | CMS | GitHub | bildflöde | STRATO-preview | produktion | annan]
- Ändrat: [berörda filer, tjänster och vad som ändrats]
- Skäl och påverkan: [varför; eventuella kompatibilitets- eller säkerhetseffekter]
- Verifiering: [faktiska tester, länkar till workflow/PR, eller ”ej verifierat”]
- Publicering: [endast gren/PR | main | preview | produktion]
- Dokumentation: [vilka dokument uppdaterades, eller att reglerna granskades och är oförändrade]
- Återstår: [nästa steg, avvikelser eller ”inget känt”]
```

Registrera även resultat från **manuella ändringar på VPS** när det går, med stöd av serverutskrift eller utfört test. Skriv **aldrig** hemligheter, lösenord, token, privata nycklar, autentiseringshashar eller råa besöksloggar här. GitHub-commits/PR:er är en separat detaljerad revisionshistorik; denna logg förklarar vad som hände och dess konsekvenser.

---

## 2026-10-19 – SEO-granskning och grundoptimering
- Område: SEO i arbetsgren seo/grundoptimering-20261019, inte publicerat.
- Gjort: bättre sidtitlar/metabeskrivningar, WebSite- och BreadcrumbList-JSON-LD, sociala metataggar, justerat guidetext och interna länkar för chiliodling och bladlöss.
- Filer: src/layouts/Base.astro, flera Astro-rutter, befintligt innehåll och src/data/sections.json, tests/seo.test.mjs och docs/SEO_AUDIT.md.
- Verifierat: GitHub Actions Validate and build https://github.com/mooody/pjrepo/actions/runs/39260913328 avslutades med success, inklusive npm ci, npm run verify och nya SEO-tester. Live-webb och Search Console kunde inte kontrolleras här.
- Gränser: CMS, OAuth, bildflöde, server, Nginx och produktion har inte ändrats.
- Dokumentation: PROJECT_RULES.md granskad och oförändrad. SERVER_OPERATIONS.md påverkas inte av detta uppdrag. CMS-förslag och genvägar redovisas i SEO_AUDIT.md.
- Konfliktlösning 2026-10-20: `main` med produkt-PR #13 integrerat i SEO-grenen. Produkternas webbetiketter, produktfoton och originaletiketter bevaras samtidigt med SEO-titlar och strukturerade brödsmulor. Kombinerad `Validate and build` godkänd i [körning 39396968276](https://github.com/mooody/pjrepo/actions/runs/39396968276) för mergecommit `fbd67d00`. Därefter endast denna dokumentationsjustering.
- Status: endast SEO-arbetsgrenen/PR #12; produkternas PR #13 är redan mergad till `main`. Godkännande krävs för SEO-merge och senare manuell deploy.

## 2026-10-19 – Webbetiketter och produktblad för B2610-5 och B2610-6
- Område: produktarkiv 2026, bilder och text på en separat arbetsgren.
- Genomfört: sex produkter i katalogen, inklusive ny produktsida för Röd Glöd (B2610-5) och Ghost (B2610-6). Översikten använder sex nya illustrerade webbetiketter, medan originaletiketterna visas på produktsidorna.
- Bilder: tio separata, optimerade WebP-filer från Drive (inklusive Röd Glöds produktfoto tillagt 2026-10-20); inga fotografiska original incheckade i GitHub, ingen ytterligare vattenstämpel. Originaltexter och etiketter oförändrade.
- Uppföljning 2026-10-20: `röd-glöd-B2610-5.png` hittades i Drive-mappen och ersätter den tillfälliga illustrerade webbetiketten som huvudbild på Röd Glöds detaljsida. Optimerad fil `rod-glod-foto.webp` 1200 × 1200 px (209 kB).
- Berörda filer: `src/content/products/rod-glod.md`, `src/content/products/ghost.md`, `src/pages/produkter-2026/index.astro`, `src/pages/produkter-2026/[slug].astro`, `tests/products.test.mjs`, tio filer under `public/product-images`, samt dokumentation.
- Verifiering: WebP-header och Git blob-SHA för tillagt produktfoto kontrollerade lokalt. `Validate and build` för commit `d897260a` godkänd i GitHub Actions-körning [39390925643](https://github.com/mooody/pjrepo/actions/runs/39390925643). Denna logguppdatering är dokumentation och får en ny kontrollkörning.
- Dokumentation: `docs/products-2026.md` uppdaterad. `docs/PROJECT_RULES.md` granskad och oförändrad; CMS-arkitektur, säkerhet, deployment och serverkonfiguration oförändrade.
- Status 2026-10-20: produkt-PR #13 mergad till `main` i commit `2e72f49b`; GitHub Actions `Validate and build` och GitHub Pages-preview godkända för den commiten. Separat STRATO-publicering av denna produktversion har inte utförts.

## 2026-10-19 – Vår historia och chilins smaker
- Område/miljö: publikt innehåll, bildtexter och presentation; separat arbetsgren.
- Ändrat: Om-sidan och dess menyval heter nu Vår historia. Texten bygger på användarens uppgifter om över 30 års chiliodling, biologiskt odlingsintresse och ambitionen att använda fler ekologiska råvaror. Befintligt foto av Habanero Red ersätter burkbilden på sidan.
- Ändrat: Förädla, startsidans introduktion och förädlingsprojektet fokuserar på smak och användning. Salt, oljor och godis beskrivs som framtida idéer. Försöks- och anteckningsspråk har tagits bort från dessa presentationer.
- Bilder: egna bildtexter visar motivbeskrivningar utan fotokredit och återkommande licensrad. Namnet Micke har ersatts med Trädgårdsdrömmar i bildbiblioteket och tagits bort från Om-sidan. Rutinmässiga kommentarer om bildbearbetning har tagits bort även i två sortartiklar. Tredjepartsbilders attribution, vattenstämplar och bildvillkor bevaras.
- Verifiering: npm ci, typkontroll, byggning och alla 14 Node-tester passerade lokalt. Playwright kunde inte starta lokalt eftersom Chromium saknas; GitHub Actions ska köra hela verifieringen. Mobilnavigationens befintliga test följer det nya menynamnet.
- Publicering: endast arbetsgren/PR; ingen merge eller publicering på server utförd i uppdraget.
- Dokumentation: PROJECT_RULES.md granskad och oförändrad; docs/images.md uppdaterad om publika bildtexter. CMS, schema, exportflöde och serverdrift är oförändrade.
- Återstår: granskning och godkännande av PR. Ett framtida huvudfoto kan visa en skördekorg med flera chilisorter bland plantorna, i mjukt dagsljus.

## 2026-10-17 – Chiliartiklar: Pequena Amarilla, Sipka Zitronen och Okrasny Zvonek Red
- Område/miljö: webbplatsinnehåll och vattenstämplade bildexporter; GitHub-arbetsgren.
- Ändrat: befintlig artikel `src/content/chilies/pequena-amarilla.md` har kompletterats med fotoobservation och texterna `src/content/chilies/sipka-zitronen.md` och `src/content/chilies/okrasny-zvonek-red.md` har skapats med befintligt CMS-schema. Källor är fröförädlaren Culinaris, Fröbanken och RHS.
- Skäl och påverkan: komplettera sortbiblioteket med två nya sorter och dokumentera bilden av Pequena Amarilla. Sortspecifik hetta hålls isär från skattningar och leverantörsskalor.
- Bilder: 24 färdiga, vattenstämplade WebP-varianter från tre valda bearbetade foton har lagts under `web-images/`; bild-ID och metadata har lagts till i `src/data/images.json` och `web-images/index.json`. De tre sortartiklarna refererar nu till bilderna. Oskyddade fotooriginal har inte lagts in i repositoryt.
- Verifiering: 24 webbexporters mått, WebP-format och frånvaro av EXIF kontrollerades före import. GitHub Actions `Validate and build` körning #43 (commit `4215164744dd2cf7c332dab471f78cfa87ab8631`) slutfördes med resultat `success`, inklusive bilder och artiklar. Slutlig visuell granskning i en publicerad miljö är ännu inte genomförd.
- Publicering: endast arbetsgren/PR; inte sammanslaget med `main` och inte publicerat på STRATO.
- Dokumentation: `docs/PROJECT_RULES.md` och `docs/images.md` granskades, oförändrade; inga server- eller CMS-ändringar.
- Återstår: granska artikelkort och bildbeskärning visuellt i preview före merge; publicering kräver separat godkännande.

## 2026-10-16 – Artikel om chilifortplantning och undermeny
- Område/miljö: webbplatsinnehåll och presentation; GitHub-arbetsgren.
- Ändrat: `src/content/pages/chilifortplantning.md` med faktabaserad artikel i befintliga CMS-samlingen Vanliga sidor, samt `src/data/settings.json`, `src/layouts/Base.astro`, `src/styles/global.css` och `src/pages/chili/index.astro` för menyvalet Chili med kortlänkar till Chilisorter och Chilifortplantning. Befintligt CMS-schema och konfiguration har behållits oförändrade. Anpassat Playwright-navigationstestet i `tests/browser/site.spec.ts` efter avläst ursprungligt testfel.
- Skäl och påverkan: gör fortplantningsbiologi och praktisk korspollinering tillgängliga utan CMS-migrering. Fyra illustrationer från Drive har identifierats, fått beskrivande namn och infogats vid relevanta avsnitt: `public/illustrationer/chiliblommans-anatomi.png`, `chili-dubbel-befruktning.png`, `chili-kontrollerad-korsning.png` och `chili-sortakta-fron.png`. Illustrationerna är separata från det skyddade fotografiska originalflödet.
- Verifiering: GitHub-filernas innehåll granskat före ändring; föregående GitHub Actions-körning visade 14 godkända Node-tester och 4/5 webbläsartester; Playwright hittade inte tidigare menyvalet Chilisorter i den utfällbara menyn. Ny verifiering inväntar Actions.
- Publicering: endast arbetsgren/pull request; inte sammanslaget med `main`, inte publicerat på STRATO.
- Dokumentation: `PROJECT_RULES.md` granskad och oförändrad, inga serverändringar.
- Återstår: verifiera PR-teststatus; granska bildtexter, bildstorlek och tillgänglighet i faktiskt byggd webbplats före merge; vid behov konvertera illustrationernas PNG till mindre webbformat i separat kontrollerad ändring.

## 2026-10-16 – Inventering av serverdrift och krav på löpande loggning
- Område/miljö: dokumentation; GitHub.
- Ändrat: dokumenterat de tre webbplatserna, Nginx-rotkataloger, certifikat, preview-skydd, driftsättning och kvarstående arbetssteg i [SERVER_OPERATIONS.md](SERVER_OPERATIONS.md). Uppdaterat [PROJECT_RULES.md](PROJECT_RULES.md) med krav på loggning och dokumentationsgranskning.
- Skäl och påverkan: olika chattar ska kunna följa samma verifierade driftstatus utan att skriva över varandras eller andra webbplatsers konfiguration.
- Verifiering: jämförelse med användarens serverutskrifter och aktuella GitHub-workflow-filer. **Ingen ny SSH-kontroll eller driftsändring utförd.**
- Publicering: endast dokumentationsgren/pull request tills den har granskats och slagits ihop.
- Dokumentation: denna logg och serverhandboken nyskapade; projektregler granskade och uppdaterade.
- Återstår: godkännande av PR; senare automatisk preview-deploy som separat uppdrag.

## 2026-10-16 – STRATO-preview fick eget HTTPS och åtkomstskydd
- Område/miljö: STRATO-preview (historisk dokumentation av redan genomförda manuella steg).
- Ändrat: subdomänen `preview.tradgardsdrommar.se`; webbrot `/var/www/tradgardsdrommar-preview/public`; separat Nginx-site `tradgardsdrommar-preview`; robots.txt, `X-Robots-Tag`, Certbot-certifikat och Basic Auth med separat htpasswd-fil.
- Skäl och påverkan: skapa privat testmiljö som inte indexeras och inte rör produktion eller Kumlamark.
- Verifiering: användaren visade Nginx/Certbot-utskrifter och bekräftade fungerande lösenordsinloggning. Certifikat för preview giltigt till 2027-01-14 enligt utskrift. **Ingen automatisk GitHub→STRATO-preview-uppdatering har implementerats.**
- Publicering: testplats på STRATO; för närvarande tillfällig testsida. Ingen produktionsförändring genom detta steg.
- Dokumentation: nu sammanfattat i [SERVER_OPERATIONS.md](SERVER_OPERATIONS.md).
- Återstår: separat preview-deploy samt full kontroll av auth/noindex efter byte till riktigt bygginnehåll.

## 2026-10-15–16 – Produktionspublicering och CMS-inloggning verifierade
- Område/miljö: produktion, GitHub Actions, CMS/OAuth (historik från uppdrag).
- Ändrat: produktionens statiska publicering från godkänd `website`-artefakt via manuellt GitHub Actions-flöde. GitHub OAuth för Decap CMS via Cloudflare Worker etablerades och fungerande inloggning samt sparning till PR verifierades av användaren.
- Skäl och påverkan: kontrollerad webbpublicering med användarstyrt godkännande; CMS kan redigera innehåll utan direkt serveråtkomst.
- Verifiering: manuell produktion-deploy-run `38855960944` gick igenom; commit `c1d2bb0686ec707382c4206f5c94603d300ace24`. Användaren verifierade CMS-inloggning och innehållsändring på `Förädla` i PR. GitHub-workflows granskade.
- Publicering: produktion enligt föregående lyckade deploy; nyare commits är inte automatiskt publicerade där.
- Dokumentation: [deployment.md](deployment.md), [oauth.md](oauth.md), [PROJECT_RULES.md](PROJECT_RULES.md).
- Återstår: ingen utökning av produktionens publiceringsbehörighet; preview-flow separat.

## 2026-10-15 – Kumlamark etablerades som separat webbplats
- Område/miljö: annan webbplats på samma STRATO VPS (historisk dokumentation).
- Ändrat: separat Nginx-site/dokumentrot för `kumlamark.se` samt `www.kumlamark.se`, certifikat från Let's Encrypt.
- Verifiering: användarens `sites-enabled`-lista och Certbot-lista; giltigt certifikat till 2027-01-13 i dåvarande utskrift.
- Publicering: separat från Trädgårdsdrömmar; **får inte ändras av detta projekts arbetsflöden**.
- Dokumentation: [SERVER_OPERATIONS.md](SERVER_OPERATIONS.md) innehåller endast läsinventering.
- Återstår: inget inom detta projekts mandat.

## 2026-10-12 – Trädgårdsdrömmar körs på VPS med Nginx och HTTPS
- Område/miljö: produktion (historisk serverinventering).
- Ändrat: separat Nginx-site för `tradgardsdrommar.se` och `www.tradgardsdrommar.se`, dokumentrot `/var/www/tradgardsdrommar.se/public`, Certbot/HTTPS.
- Verifiering: datum för Nginx-site enligt användarens lista, senare utskrift av Nginx-konfiguration och giltigt certifikat (till 2027-01-10 i utskrift).
- Dokumentation: [deployment.md](deployment.md), [SERVER_OPERATIONS.md](SERVER_OPERATIONS.md).
- Återstår: inget i detta historiska steg.

**Obs:** Äldre poster är en sammanställning från tillgängliga serverutskrifter och GitHub-historik, inte en fullständig revisionslogg över varje utfört kommando. För framtida ändringar förs löpande logg med verifierad status.
