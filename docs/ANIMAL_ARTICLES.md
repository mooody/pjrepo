# Djurartiklar – redaktionellt upplägg

Guldögonsländor är den första fullt utvecklade djurartikeln från Drive-förarbetet. Den ligger på befintlig adress `/nyttodjur/guldogonslandor/` i samlingen `beneficials`. Detta dokument beskriver det genomförda innehållsupplägget, inte en ny CMS- eller menystruktur.

## Genomförande av resterande nyttodjur – 2026-10-24

**Status: arbetsgren och PR, inte mergat eller publicerat.** Projektets Drive-mapp `Trädgårdsdrömmar – biologisk odling – webbutkast` och dess sidregister (13 nyttodjursdokument N01–N13) är lästa. Befintliga guldögonsländor ligger kvar. Nyckelpigor behandlas separat i öppna PR #31 och har inte skrivits över av detta arbete.

För de elva resterande grupperna har befintlig parasitstekelsida fördjupats och tio nya `beneficials`-artiklar skapats: blomflugor, bladlusgallmygga, rovskinnbaggar, jordlöpare, rovtrips, minerarflugeparasitoider, rovkvalster mot spinn, jordlevande rovkvalster, nematoder mot sorgmyggor och rovkvalster mot trips. Samlingssidan beskriver nu hela serien och skiljer naturligt förekommande nyttodjur från sådana som ofta köps in. Samtliga använder befintliga URLs under `/nyttodjur/`, samma sidmall och CMS-schema, egna källfält, men inga nya bild-ID:n.

**Faktagränser:** Blomflugelarver har skilda levnadssätt; bladlusgallmyggan kräver skyddad förpuppningsmiljö; parasitstekelmumier kan innehålla hyperparasitoider; `Orius majusculus` bygger på skilda temperatur-/födoexperiment; jordlöparens årsvarv gäller en exempelart; `Aeolothrips fasciatus` saknar verifierade separata stadietider. För köpta nyttodjur skiljer texten `Diglyphus isaea` från `Dacnusa`, spinnspecialisten `Phytoseiulus persimilis` från andra rovkvalster, jordkvalstret `Stratiolaelaps scimitus` från äldre handelsnamn, nematodens infektiösa J3-form från extra stadier, och `Amblyseius swirskii` från andra arter. Ingen av studierna presenteras som svensk normalprognos.

**Bildunderlag:** De elva individuella Drive-mapparna innehåller illustrerade stadier, livscykler, faktakontroll och fotoreferenser. Dessa är **inte publicerade** i denna PR eftersom skyddad beskärning, etikettgranskning och vattenstämplad WebP-export inte har genomförts. I artikeltexterna finns i stället länkar till namngivna bildreferenser hos UC IPM, Cornell eller andra publicerade institutioner. Inga externt upphovsrättsligt skyddade foton eller oskyddade Drive-original kopierades till publikt GitHub. Bildexport enligt `docs/images.md` är kvarstående arbete och kräver bildgranskning per art och stadium.

**Verifiering:** Node/SEO-test kontrollerar sidorna och `BreadcrumbList`. Playwright kontrollerar samlingslistans antal, läsrubriker, källor och mobilvisning. PR-checkarnas utfall och eventuell omtestning hör till samma PR. Vid merge av PR #31 och denna gren kontrolleras att båda ändringsloggarna och den fristående nyckelpigeartikeln bevaras. Ingen produktionspublicering sker.

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
