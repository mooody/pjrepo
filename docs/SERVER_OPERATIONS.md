# Serverdrift – STRATO VPS, Trädgårdsdrömmar och Kumlamark

**Senast dokumenterat:** 2026-10-16. **Läs först [PROJECT_RULES.md](PROJECT_RULES.md)**, som ensam innehåller projektets bindande arbetsregler. Denna fil är en **driftbeskrivning**, inte ett mandat att ändra servern.

**Underlag:** kontrollerade GitHub-filer och serverutskrifter/funktionstester som användaren delade 2026-10-15–16. Uppgifterna om Nginx, Certbot och Basic Auth är från dessa kontroller; assistenten har **inte** gjort en ny direkt SSH-inspektion av VPS:en. Kontrollera därför live-läget innan ingrepp. Dokumentera ändringar i [CHANGELOG.md](CHANGELOG.md).

## 1. Översikt och ansvar

- Leverantör: STRATO VPS; enligt befintlig driftdokumentation **Debian 13**, **Nginx**, **UFW** (SSH 22, HTTP 80, HTTPS 443) och **Certbot/Let's Encrypt**.
- Dokumenterad serveradress i befintliga GitHub Actions-variabler: `217.154.118.103`. Verifiera DNS och aktuell anslutning innan åtgärder.
- Webbplatsen byggs till statiska filer med **Astro + Node.js 24 i GitHub Actions**. Ingen Astro/Node-process eller databas krävs på VPS:en för denna webbplats.
- Det finns **flera oberoende webbplatser på samma VPS**. Ändra aldrig en annan webbplats som bieffekt av ett Trädgårdsdrömmar-uppdrag.

| Webbplats | Domän(er) | Nginx-konfiguration | Dokumentrot |
| --- | --- | --- | --- |
| Trädgårdsdrömmar, produktion | `tradgardsdrommar.se`, `www.tradgardsdrommar.se` | `/etc/nginx/sites-available/tradgardsdrommar.se` | `/var/www/tradgardsdrommar.se/public` |
| Trädgårdsdrömmar, preview | `preview.tradgardsdrommar.se` | `/etc/nginx/sites-available/tradgardsdrommar-preview` | `/var/www/tradgardsdrommar-preview/public` |
| Kumlamark | `kumlamark.se`, `www.kumlamark.se` | `/etc/nginx/sites-available/kumlamark.se` | `/var/www/kumlamark.se/public` |

**Kumlamark är en separat webbplats** som inte ska ändras av projektets vanliga arbetsflöden. Dess dokumentrot och namn här är inventering, inte instruktion att publicera dit.

Den 15 oktober visade `/etc/nginx/sites-enabled/` symlänkarna `default`, `kumlamark.se` och `tradgardsdrommar.se`. Preview lades senare till som separat Nginx-site och fungerade med HTTPS och lösenord, men den slutliga symlänklistan kontrollerades inte på nytt i chatten. Bekräfta vid behov med `sudo ls -l /etc/nginx/sites-enabled/`.

## 2. Produktion – verifierat upplägg

`/etc/nginx/sites-available/tradgardsdrommar.se` använder servernamnen apex + `www` och dokumentrot `/var/www/tradgardsdrommar.se/public`, `index index.html`, och `location / { try_files $uri $uri/ =404; }`. Certbot hanterar HTTPS-servern på 443 och HTTP-omdirigering på port 80.

**Separata certifikat:** Certbot visade 2026-10-16:

| Certificate Name | Namn som ingår | Utgång enligt dåvarande utskrift |
| --- | --- | --- |
| `tradgardsdrommar.se` | apex och `www` | 2027-01-10 |
| `preview.tradgardsdrommar.se` | enbart preview | 2027-01-14 |
| `kumlamark.se` | apex och `www` | 2027-01-13 |

Certifikaten var giltiga vid kontrolltillfället. Certbot är installerat; kontrollera faktisk automatisk förnyelse vid behov med `sudo certbot renew --dry-run`. Ändra eller ersätt inte certifikat för övriga webbplatser när preview hanteras.

## 3. Preview – faktiskt färdigställt

`preview.tradgardsdrommar.se` skapades som subdomän i STRATO och pekades mot VPS:en. Användaren har bekräftat att adressen fungerar.

Preview har:
- **Egen webbrot:** `/var/www/tradgardsdrommar-preview/public`, med en **tillfällig testsida** (`Trädgårdsdrömmar – Preview`) tills deployflödet är färdigt.
- **Egen Nginx-site:** `/etc/nginx/sites-available/tradgardsdrommar-preview`, skild från produktionskonfigurationen.
- **HTTPS:** Let's Encrypt-certifikat `preview.tradgardsdrommar.se`, konfigurerat med `certbot --nginx`; port 80 omdirigerar till HTTPS.
- **Åtkomstskydd:** Nginx HTTP Basic Auth. Användaren har verifierat att inloggningsrutan visas och fungerar.
- **Lösenordsfilens plats:** `/etc/nginx/.htpasswd-tradgardsdrommar-preview`. Behörigheter konfigurerades enligt instruktion som `root:www-data`, `0640`; kontrollera dessa på servern om uppgiften behövs. **Läs inte ut eller kopiera hashvärden till GitHub/chatt.**
- **Indexeringsskydd:** separat `robots.txt` med `User-agent: *` och `Disallow: /`, samt Nginx-headern `X-Robots-Tag: noindex, nofollow, noarchive` med `always`.
- **Statisk leverans:** `try_files $uri $uri/ =404` i preview-serverblocket.

Den användarvisade Nginx-konfigurationen efter Certbot hade:
```nginx
server_name preview.tradgardsdrommar.se;
root /var/www/tradgardsdrommar-preview/public;
index index.html;
add_header X-Robots-Tag "noindex, nofollow, noarchive" always;
location / { try_files $uri $uri/ =404; }
```
Därefter lades `auth_basic` och `auth_basic_user_file` till utan att skriva över Certbots TLS-inställningar, och användaren bekräftade att skyddet fungerade. Ovan är **ett orienterande utdrag, inte en komplett ersättningskonfiguration**. Hämta live-filen innan ändring; Certbots SSL-direktiv och HTTP-serverblock måste bevaras.

**Ej färdigt:** Automatisk driftsättning från GitHub Actions till denna STRATO-preview, och slutlig växling från GitHub Pages-preview. Lösenordsskyddad preview fungerar som serverplats, **inte ännu som automatiskt uppdaterad webbplats**.

**Viktigt:** robots.txt och noindex är instruktioner till sökmotorer, inte autentisering. Basic Auth ska alltid bevaras. Kontrollen att HTTP ger 401 och X-Robots-Tag kan göras utan lösenord med `curl -I https://preview.tradgardsdrommar.se/`; det exakta kommandoutfallet har inte lagrats i chatten.

## 4. GitHub och driftsättning

Repository för webbplatsen: `mooody/pjrepo` (vid dokumentationen **public**; avsikt att göra privat först när egen preview är verifierad). GitHub är källa till kod/innehåll, servern får endast kompilerade statiska webbplatsfiler.

**Befintliga workflow-filer:**
1. `.github/workflows/verify.yml` – **Validate and build**, kör vid PR och push till `main`, Node 24, `npm run verify`. Skriver byggartefakten `website` (retention **7 dagar**).
2. `.github/workflows/pages-preview.yml` – **Preview website on GitHub Pages**, byggs från `main` till `https://mooody.github.io/pjrepo/` och får noindex-markering. **Detta är inte STRATO-preview.**
3. `.github/workflows/publish-production.yml` – **Publish approved build to STRATO**. **Manuell** `workflow_dispatch` kräver `build_run_id` från en framgångsrik slutförd huvudgrensbyggning och laddar ner **exakt** den granskade artefakten till produktion.
4. `scripts/deploy.sh` – SSH/rsync, kontrollerar fast produktionsväg `/var/www/tradgardsdrommar.se/public`, kräver att målvägen redan finns, validerar SSH och använder `--delete --delay-updates` med undantag för `/.well-known/`.

**Befintliga GitHub Actions-konfigurationsnamn för produktionsdeploy:**
- Variabler: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`.
- Secrets: `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS`.
- Dokumenterad särskild deploy-användare: `td-deploy` utan sudo.
- Miljö: `production`. Kontrollera alltid det faktiska behörighetsläget och om eventuella GitHub Environment-godkännanden är konfigurerade; de får inte förutsättas.

**Ändra inte** detta workflow till auto-deploy och återanvänd inte produktionsskriptet/produktionsmålet för STRATO-preview. För en framtida preview-deploy behövs en separat och granskad lösning med *exakt* preview-målkatalog, lämpliga filrättigheter och utan risk att rsync raderar produktionsfiler. Kräver uttryckligt godkännande enligt [projektreglerna](PROJECT_RULES.md).

Den senaste dokumenterade lyckade produktionsdeployen vid kontrollen 2026-10-16 var GitHub Actions-run `38855960944` för commit `c1d2bb0686ec707382c4206f5c94603d300ace24`. Nyare commits på `main` behöver inte vara publicerade på STRATO. Kontrollera aktuella runs före påståenden om produktionsversion.

## 5. CMS och OAuth i drift

- Decap CMS serveras statiskt från `/admin/` på produktionen och sparar ändringar till GitHub via `editorial_workflow`.
- Användaren har verifierat **lyckad GitHub-inloggning och sparning till en redaktionell pull request**.
- OAuth körs i Cloudflare Worker: `sveltia-cms-auth.mikael-forsberg74.workers.dev`, kod i separat repository `mooody/sveltia-cms-auth`.
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` och `ALLOWED_DOMAINS` konfigureras som Cloudflare runtime-inställningar. **Skriv aldrig hemlighetsvärden i dokumentation eller repo.** `wrangler.toml` använder `keep_vars = true`.
- OAuth Worker tillåter de ordinarie domänerna; **preview behöver inte kunna logga in i CMS** för att fungera som förhandsvisning. Bredda aldrig `ALLOWED_DOMAINS` enbart för preview utan uttryckligt godkännande.

Läs [oauth.md](oauth.md) och aktuella CMS-filer om autentisering berörs.

## 6. Inspektion och felsökning (skrivskyddat när möjligt)

```sh
sudo ls -l /etc/nginx/sites-enabled/
sudo nginx -t
sudo certbot certificates
sudo systemctl status nginx
sudo ufw status
curl -I https://www.tradgardsdrommar.se/
curl -I https://preview.tradgardsdrommar.se/
sudo tail -n 50 /var/log/nginx/tradgardsdrommar.error.log
sudo tail -n 50 /var/log/nginx/tradgardsdrommar-preview.error.log
sudo tail -n 50 /var/log/letsencrypt/letsencrypt.log
```

**Driftloggar på servern** (namn framgår av visade Nginx-filer och Certbot):
- Produktion: `/var/log/nginx/tradgardsdrommar.access.log`, `/var/log/nginx/tradgardsdrommar.error.log`.
- Preview: `/var/log/nginx/tradgardsdrommar-preview.access.log`, `/var/log/nginx/tradgardsdrommar-preview.error.log`.
- Certbot: `/var/log/letsencrypt/letsencrypt.log`.
- GitHub Actions: loggar per workflow-körning under repositoryts **Actions**-flik.

Skilj dessa **tekniska körloggar** från projektets **bestående ändringshistorik** i [CHANGELOG.md](CHANGELOG.md). Logga inte lösenord, token, privata certifikatnycklar, personuppgifter, sessioner eller råa åtkomstloggar i GitHub.

## 7. Ändringar, skydd och återställning

Vid varje ändringsuppdrag: följ dokumentationsrutinen i [PROJECT_RULES.md](PROJECT_RULES.md) och registrera arbetet i [CHANGELOG.md](CHANGELOG.md). Om serverns faktiska tillstånd ändras: uppdatera **denna** fil i samma PR, med kontrollerad status. Ändra inte faktauppgifter från ”planerat” till ”verifierat” utan verkligt test.

- Inför Nginx-ändring: ta backup av **rätt** site-fil, kontrollera `sudo nginx -t`, därefter `sudo systemctl reload nginx` enbart vid godkänt resultat.
- Ingen produktionspublicering utan användarens godkännande; inga ”städningar” på Kumlamark.
- `rsync --delete` kan ta bort filer från vald webbrot: kontrollera mål och undantag.
- Fullständig backup/omedelbar rollback är **inte** dokumenterad som implementerad. Git-historik och 7-dagarsartefakter ersätter inte serverbackup.
- Dokumentera datum, ändrade filer/konfiguration, syfte, test, länk till PR/run och vad som återstår.

## 8. Kvar att göra (inte utfört)

- Införa **separat automatiskt** GitHub Actions-flöde för **STRATO-preview**, utan att förändra produktionsflödet.
- Säkerställa skrivbehörighet, korrekta deploy-nycklar, strikt path-guard och noindex/auth efter riktig preview-publicering.
- Testa preview med kompilerat bygginnehåll samt HTTP 401/HTTPS/header/robots och jämför med produktion.
- Först därefter: besluta om GitHub Pages-preview ska tas bort och `pjrepo` ska göras privat.
- Bedöma riktig backup och dokumenterad återställning för serverkonfigurationer och webbplatsfiler.

**Senaste tillståndet kan ha förändrats efter detta dokuments datum. Kontrollera live före varje serveråtgärd.**
