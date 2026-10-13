# Genomförande och återstående kontroller

## Implementerat

- Bred navigation: Odla, Livet i trädgården, Förädla, Odlingsdagbok och Om.
- Ny startsida och Om-text; pågående odling/förädling skild från framtida projekt.
- Tre egna berättelser samt fördjupade guider om chili, jord, kompost, täckodling, mångfald och biologiskt växtskydd.
- Källspecifika styrkeuppgifter i stället för obelagda SHU-intervall.
- Fem dokumentära bilder med responsiva exporter, korrekta mått och vattenstämpel efter varje beskärning.
- CMS-fält för redaktionella gränssnittstexter, biologisk-odling-ingången och startsidans länkar/rubriker.
- Native Astro-base plus idempotent anpassning av innehållslänkar; Pages behöver inte skriva om absolut metadata eller srcset med generella ersättningar.
- Mobilnavigation finns även utan JavaScript; tydlig fokusmarkering och Escape stänger öppnad meny.
- Skyddat originalflöde och avstängd originaluppladdning via CMS.
- Delningsbild och uppdaterade bildvillkor.

## Behöver externa uppgifter eller nytt material

- `backend.base_url` i CMS måste få den verkliga OAuth-förmedlarens adress. OAuth-app, hemligheter och kontoanslutning har inte konfigurerats. Se docs/oauth.md.
- Offentlig e-post eller social kontaktväg är ännu inte angiven; ingen adress har hittats på.
- Originalbilder från äldre insektfynd behöver återfinnas och granskas igen. Nyttodjurs- och skadedjurstexterna är redaktionella utkast tills bildstöd och innehåll har kontrollerats. Direktadresserna för dessa utkast är inte publicerade.
- Fler sortbilder kräver säker koppling till rätt planta/sortunderlag.
- Biokol, droppbevattning, livsstadier och blomningsplan har arbetsutkast i CMS, utan påhittade resultat eller doseringsråd.
- Visuell mobil-/datorgranskning och CMS-inloggning är inte verifierade. Tidigare webbläsaråtkomst nekades och kringgås inte genom alternativ rendering.
- Nya foton behöver tas enligt docs/photography-plan.md.
- Produktionspublicering på Debian/Nginx är inte utförd här. Behåll statiskt upplägg utan webbshop eller databas.

Detta är en genomförd första implementation av förslagen, inte ett påstående om att kontoberoende steg eller fotografering är klara.
