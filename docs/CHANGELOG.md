# Ändringslogg – Trädgårdsdrömmar

**Omfattning:** ändringar av innehåll, kod, CMS, bilder, GitHub-workflows, OAuth, server, DNS, certifikat och publicering. Lägg en tydlig post per uppdrag/PR även när ändringen bara gäller innehåll. Granska samtidigt [PROJECT_RULES.md](PROJECT_RULES.md) och relevant dokumentation; uppdatera dem när beskrivningen eller reglerna påverkas.

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
