# Djurartiklar – redaktionellt upplägg

## Artikelmodeller och redaktionell genomgång – 24 oktober 2026

Se **[ANIMAL_ARTICLE_TEMPLATE.md](ANIMAL_ARTICLE_TEMPLATE.md)** för tre separata läsarflöden och frivilliga specialavsnitt: skadedjur, naturliga nyttodjur och nyttodjur för biologisk bekämpning. Detta är **en redaktionell överenskommelse, inte en ändring av CMS-samlingar, schema eller URL:er**.

**PR-status:** #31 och #32 är mergade till `main` (24 oktober). De äldre nedanstående raderna som nämner öppna/omergade PR:er är historiska arbetslägen från tidigare samma datum. Detta förbättringsarbete ligger i en **ny PR** eftersom #32 redan är avslutad. Ingen produktionspublicering följer av dokumentationen.

**Justeringar i den nya arbetsgrenen:** synliga brödsmulor visar enbart klickbara *överordnade* nivåer (artikelns rubrik står redan i H1). Fullständig BreadcrumbList i JSON-LD omfattar fortfarande aktuell sida. Ingressen i metadata visas bara en gång; upprepad exakt inledning i Markdown tas bort. Under `/nyttodjur/` finns två redaktionella grupper med filtrering: åtta naturliga nyttodjur och fem för biologisk bekämpning; alla behåller sina URLs och det befintliga `category`-fältet.

Naturliga nyttodjur lyfter nu miljö, föda och skydd över säsongen före långa utseendekataloger. Jordlöparens och de liknande mark-/blomlivsartiklarnas generella ”Börja här”-råd flyttas till habitatavsnittet. Inköpta nyttodjur prioriterar målskadegörare, när metoden passar, etableringsvillkor och hur resultat följs. Skadedjur prioriterar igenkänning av angrepp, nya skador, åtgärder och naturliga fiender. Enskilda art-/studieförbehåll och specialrubriker får stå kvar.

**Bilder:** tre redan publicerade och vattenstämplade webbexporter återanvänds redaktionellt: eget foto av ett sannolikt bladluslejon i den generella bladlusguiden, en tydligt betecknad markmiljöillustration hos jordlöpare och en schematisk miljöillustration hos blomflugor. Detta är *inte* nya artbestämda foton. De 27 Drive-livscyklerna i `Webbguide – förenklade livscykelcirklar` samt djurmapparna finns verifierade; nya filer har ännu **inte** exporterats genom projektets skyddade WebP-/vattenstämpelflöde och är inte publicerade via denna arbetsgren. Sköldlössens omstridda nymfindelning kräver särskild granskning.

Guldögonsländor är den första fullt utvecklade djurartikeln från Drive-förarbetet. Den ligger på befintlig adress `/nyttodjur/guldogonslandor/` i samlingen `beneficials`. Detta dokument beskriver det genomförda innehållsupplägget, inte en ny CMS- eller menystruktur.

## Genomförande av resterande nyttodjur – 2026-10-24

**Status: arbetsgren och PR, inte mergat eller publicerat.** Projektets Drive-mapp `Trädgårdsdrömmar – biologisk odling – webbutkast` och dess sidregister (13 nyttodjursdokument N01–N13) är lästa. Befintliga guldögonsländor ligger kvar. Nyckelpigor fördjupades i PR #31, som **mergades till main 2026-10-24** (mergecommit `c8ce77d40a9d`), och har inte skrivits över av detta arbete.

För de elva resterande grupperna har befintlig parasitstekelsida fördjupats och tio nya `beneficials`-artiklar skapats: blomflugor, bladlusgallmygga, rovskinnbaggar, jordlöpare, rovtrips, minerarflugeparasitoider, rovkvalster mot spinn, jordlevande rovkvalster, nematoder mot sorgmyggor och rovkvalster mot trips. Samlingssidan beskriver nu hela serien och skiljer naturligt förekommande nyttodjur från sådana som ofta köps in. Samtliga använder befintliga URLs under `/nyttodjur/`, samma sidmall och CMS-schema, egna källfält, men inga nya bild-ID:n.

**Faktagränser:** Blomflugelarver har skilda levnadssätt; bladlusgallmyggan kräver skyddad förpuppningsmiljö; parasitstekelmumier kan innehålla hyperparasitoider; `Orius majusculus` bygger på skilda temperatur-/födoexperiment; jordlöparens årsvarv gäller en exempelart; `Aeolothrips fasciatus` saknar verifierade separata stadietider. För köpta nyttodjur skiljer texten `Diglyphus isaea` från `Dacnusa`, spinnspecialisten `Phytoseiulus persimilis` från andra rovkvalster, jordkvalstret `Stratiolaelaps scimitus` från äldre handelsnamn, nematodens infektiösa J3-form från extra stadier, och `Amblyseius swirskii` från andra arter. Ingen av studierna presenteras som svensk normalprognos.

**Bildunderlag:** De elva individuella Drive-mapparna innehåller illustrerade stadier, livscykler, faktakontroll och fotoreferenser. Dessa är **inte publicerade** i denna PR eftersom skyddad beskärning, etikettgranskning och vattenstämplad WebP-export inte har genomförts. I artikeltexterna finns i stället länkar till namngivna bildreferenser hos UC IPM, Cornell eller andra publicerade institutioner. Inga externt upphovsrättsligt skyddade foton eller oskyddade Drive-original kopierades till publikt GitHub. Bildexport enligt `docs/images.md` är kvarstående arbete och kräver bildgranskning per art och stadium.

**Verifiering:** Node/SEO-test kontrollerar sidorna och `BreadcrumbList`. Playwright kontrollerar samlingslistans antal, läsrubriker, källor och mobilvisning. PR-checkarnas utfall och eventuell omtestning hör till samma PR. När PR #32 mergas måste nyckelpigeartikeln och dokumentationen från redan mergade PR #31 bevaras. Ingen produktionspublicering sker.

## Skadedjur – 14 specialguider på PR #32 (2026-10-24)

**Genomfört i arbetsgrenen, ännu inte mergat/publicerat:** Samtliga 14 skadedjursdokument från Google Drive-mappen [Trädgårdsdrömmar – biologisk odling – webbutkast](https://drive.google.com/drive/folders/1c5r02L1r-LMIvl-11d7dwQ4RLNd10YNo) används som källor för 14 nya artiklar i den befintliga samlingen `src/content/pests`. Den äldre allmänna artikeln `/skadedjur/bladloss/` behåller sin URL och huvudtext, men kompletteras med länkar till de tre särskilda bladlusguiderna och ytterligare nyttodjur. Därmed finns **15 skadedjurssidor**: gröna och svarta bladlöss, kålbladlus, trips, spinnkvalster, mjöllöss, sorgmyggor, minerarflugor, rovfjäril, stor kålfjäril, kålmal, kålfly, bredkvalster, sköldlöss samt den generella bladlusguiden.

### Redaktionell kontroll och avgränsning

- Varje artikel har kännetecken, skadesymptom, första försiktiga åtgärder, naturliga fiender, miljö/övervintring och en tydligt avgränsad livscykel där underlaget stödjer den.
- Persikbladlus/bönbladlus är **exempelarter** för gröna respektive svarta bladlöss, inte bestämningar enbart efter färg. Kålbladlus är knuten till korsblommiga värdar. Bladlusmumier får inte förväxlas med levande löss.
- Tripsarternas roller skiljs från rovtrips och rovkvalstrens roll; spinnkvalster och bredkvalster är olika grupper med olika skadebilder. Förvridna chiliskott ensamt bevisar inte bredkvalster.
- Rovfjäril `Pieris rapae`, större kålfjäril `Pieris brassicae`, kålmal `Plutella xylostella` och kålfly `Mamestra brassicae` har egna igenkänningsdrag och larvförlopp. Användaren kan därför jämföra ensamlagda ägg, äggklungor, fönstergnag och djupare kålhål.
- **Sköldlöss:** `Coccus hesperidum` har motstridiga källuppgifter om nymfstadier. Artikeltexten håller uppgifterna på översiktlig nivå och anger öppet att exakta stadiumlängder behöver fortsatt granskning. Mjuka sköldlöss och pansarsköldlöss får inte blandas ihop.
- Temperatur, värdart och utvecklingstider beskriver enskilda studier, inte normala dygn i svenska odlingar. I kålmalens fall kommer uppgifter från olika studier och för den stora kålfjärilen saknas uppgiven försöks­temperatur; detta anges i text.
- Arterna är **inte** dokumenterade observationer från Mickes egen odling. Externa forsknings- och rådgivningsreferenser citeras eller länkas; fotografierna kopieras inte.

### Bilder och kvarstående arbete

Förarbetets individmappar innehåller egna AI-stadieillustrationer samt livscykelbilder (PNG/SVG), flera med redaktionella reservationsnoteringar. De har **inte** lagts till i offentliga GitHub. Innan bilderna förs in på webbsidan behöver de kontrolleras per stadium, få tydliga etiketter och alt-texter och genomgå den **befintliga skyddade vattenstämpel-/WebP-exporten** i `docs/images.md`. Särskilt sköldlössens omstridda stadiumindelning får inte visas som slutligt verifierad. Befintliga CMS-/bildrelationer och säkerhetsregler lämnas oförändrade.

**Status:** Innehållet är sparat i samma gren som PR #32, testat genom projektets befintliga kontroller när Actions körts för slutlig commit. Nyckelpige-PR #31 är mergad i `main` den 24 oktober; dokumentationsöverlägg behöver bevara även dess tillägg. PR #32 är inte mergad och ingen STRATO-produktionspublicering görs.

## Läsarens väg genom en artikel

1. Kort introduktion: vad läsaren kan ha sett och varför djuret är relevant.
2. Så känner du igen dem: vuxen och relevanta unga stadier, med begripliga kännetecken och ungefärliga mått där de hjälper.
3. Roll i odlingen: skada eller nytta, med skillnader mellan arter och livsstadier när de påverkar förståelsen.
4. Börja här: praktisk observation och rimliga första åtgärder.
5. Samspel med andra djur.
6. Miljö och övervintring, anpassat till gruppen.
7. Livscykel: ett begripligt huvudförlopp och vid behov ett tydligt avgränsat studieexempel.
8. Kort inköpskoppling när den är relevant. Den gemensamma inköpsguiden skrivs separat; länka först när sidan finns.

Rubriker får anpassas till djuret. Skapa inte extra text enbart för att fylla en mall. Grundförklaringar om mångfald, blomning och allmänna skadeåtgärder hänvisas till befintliga guider.

## Text och bild hör ihop

- Använd en förenklad livscykel i huvudartikeln när många instarrutor inte hjälper läsaren. Tre larvstadier kan beskrivas som en växande larv utan att påstå att hudömsningarna saknas.
- Skriv att mått är ungefärliga och förstoringen varierar. Kroppslängd, vingspann och kokongdiameter är olika mått.
- Studieexempel ska ange art/grupp och relevanta förhållanden. Vuxenliv ska inte läggas till som väntetid från ägg till vuxen. Ett laboratorieresultat är ingen svensk kalenderprognos.
- Identifieringsbilder behöver rätt kännetecken, bra alt-text och en bildtext som anger om de är illustrationer. Utelämna osäkra detaljer som inte behövs för igenkänning.
- I guldögonsländans artikel används befintligt huvudbildsfält och vanliga Markdown/HTML-figurer i brödtexten. De senare länkar till större vattenstämplade webbversioner, så att text i figuren går att förstora. Inga artikelkomponenter eller schemafält har lagts till.

## Inför fortsatt arbete

Återanvänd befintliga sidor där ämnet redan finns och bevara adresserna. Utgå från de aktuella individuella djurdokumenten och förenklade livscyklerna; de detaljerade bildmapparna innehåller också äldre arkiv. Skilj läsartext från arbetsanteckningar och kontrollera gamla statusrader, föreslagna adresser samt bildlänkar.

Efterföljande djurartiklar är ännu inte införda genom detta uppdrag. Sköldlössens stadieindelning och rovtripsens osäkra detaljtider är exempel på kvarstående punkter i Drive-registret, inte lösta av att denna första artikel blivit klar.

## Fortsättning 2026-10-24 – näringsväven

Efter mergad PR #27 införs näringsvävsartikeln i separat arbetsgren på `/odlingsmetoder/naringsvaven-i-odlingen/`, direkt under Biologiskt växtskydd. Den binder samman födoval, livsstadier, honungsdagg och markliv. Befintligt larvfoto och jordlivsillustration återanvänds oförändrade, med odlingsmiljön från filosofiartikeln som huvudbild. Fotot på blomman är inte belägg för födointag. Jord- och blomningsråd länkas till sina befintliga guider. Ingen ytterligare djurartikel eller köpguide är färdigställd genom detta steg. Fortsätt därefter med de individuella djurdokumenten enligt upplägget ovan.

## Fortsättning 2026-10-24 – nyckelpigor

Utifrån [Drive-förarbetet N01 – Nyckelpigor](https://docs.google.com/document/d/10BI3jNZwVadu772mc89EliQA03XKyQd-VFPD43NEqw8/edit) och sidregistret har den befintliga sidan `/nyttodjur/nyckelpigor/` utvecklats i grenen `content/nyckelpigor-fordjupning-20261024`. Grunderna om gruppen Coccinellidae hålls isär från livscykelexemplet med `Coccinella septempunctata`. Larv och puppa förklaras med praktisk igenkänning, inklusive skillnaden mot skadegörare och att prickar inte anger ålder. Ägg–vuxen-försöket med varierande temperatur och rosbladlus presenteras som ett laboratorieexempel, inte svensk normaltid. Källor från RHS, NRM, SLU, Cornell och forskningsartikeln finns i den publika sidans källfält.

**Bildstatus:** Förarbetets aktuella egna AI-illustrationer och livscykel ligger i [nyckelpigemappen på Drive](https://drive.google.com/drive/folders/1aHr2gHDGrNuTM0ErHw5wdV_vFMO3bR6J). De har granskats i det tidigare bildarbetet men har **inte** exporterats till vattenstämplade webbvarianter i denna gren. Webbtexten hänvisar tills vidare till externa referensfoton från RHS och Naturhistoriska riksmuseet; dessa kopieras inte in. Innan ny bild publiceras ska befintligt skyddat bildexportflöde i `docs/images.md` följas. Originalfiler och osäkra fotokällor får inte läggas i det publika repositoryt.

**Nästa redaktionella grupp:** Blomflugor (N03) eller Bladlusparasitsteklar (N05) från samma Drive-mapp efter att nyckelpigornas bildexport är löst. Ingen CMS-förändring och ingen produktionspublicering har gjorts.
