# Publicera Trädgårdsdrömmar på Debian 13

**Arkitektur (15 oktober 2026):** GitHub är källan till koden och bygger Astro-sajten med Node.js 24. Endast färdiga statiska filer från `dist/` skickas via SSH/rsync till STRATO-VPS. Nginx serverar `/var/www/tradgardsdrommar.se/public/`. VPS:en behöver **inte** köra Node.js eller innehålla Git-repot.

Det här skiljer sig från det tidigare förslaget med `releases/` och `current`-symlänk. För denna lilla statiska webbplats har vi valt ett enklare flöde utan sparade releaser på servern. Git-historiken i sig ersätter dock inte en riktig backup eller en omedelbar rollback av färdigbyggda filer.

## Befintlig server

- Debian 13, Nginx och HTTPS med Let's Encrypt.
- Domän: `tradgardsdrommar.se` och `www.tradgardsdrommar.se`.
- Dokumentrot för Nginx: `/var/www/tradgardsdrommar.se/public`.
- Brandvägg UFW tillåter SSH (22), HTTP (80), HTTPS (443).

Nginx ska ha `root /var/www/tradgardsdrommar.se/public;`, och `nginx -t` ska lyckas. `/var/www/tradgardsdrommar.se/source` är en äldre lokal klon och behövs inte för den valda publiceringen.

## Tre fristående GitHub Actions (uppdelade 15 oktober 2026)

1. **Validate and build** (`.github/workflows/verify.yml`) kör automatiskt vid push till `main` och pull requests. Den testar och bygger med Node.js 24, och sparar `dist/` som artefakten **website** i **7 dagar**. **Ingen produktionsdeploy sker i detta workflow.**
2. **Preview website on GitHub Pages** (`.github/workflows/pages-preview.yml`) bygger och uppdaterar automatiskt förhandsvisningen på https://mooody.github.io/pjrepo/ från `main`. Den publicerar inte till STRATO. Preview använder annan base path (`/pjrepo/`) än produktion, men samma webbplatsinnehåll.
3. **Publish approved build to STRATO** (`.github/workflows/publish-production.yml`) har *endast* triggern `workflow_dispatch` och körs när någon själv väljer **Run workflow**. Den kräver ID för en tidigare lyckad `Validate and build`-körning av `main`, kontrollerar dess resultat och hämtar exakt dess `website`-artefakt. Inget automatiskt produktionsutskick sker efter en push.

Workflowen för manuell publicering använder redan konfigurerade SSH-nycklar och Nginx-katalogen. Variabeln `DEPLOY_ENABLED` från föregående upplägg behövs inte längre och kan tas bort från GitHubs repository variables. Kom ihåg att Pages-preview alltid representerar den **senast publicerade previewversionen**, medan du anger ett specifikt bygg-ID för produktion.

### Förbered SSH på VPS

Rekommenderat: skapa ett separat Linuxkonto utan sudo för deploy, till exempel `td-deploy`. Använd en *egen* Ed25519-nyckel för GitHub Actions, inte den privata nyckeln från Macens ordinarie SSH-inloggning.

På Debian (som `micke`):

```sh
sudo apt update
sudo apt install -y rsync
sudo adduser --disabled-password --gecos "" td-deploy
sudo install -d -m 700 -o td-deploy -g td-deploy /home/td-deploy/.ssh
```

Placera sedan **endast den publika** nyckeln från det dedikerade nyckelparet i `/home/td-deploy/.ssh/authorized_keys`. Sätt `chown td-deploy:td-deploy`, rättigheter 600 på authorized_keys, och se till att användaren kan skriva i Nginx-dokumentroten:

```sh
sudo chown -R td-deploy:www-data /var/www/tradgardsdrommar.se/public
sudo chmod 755 /var/www/tradgardsdrommar.se/public
```

Om `public/` redan innehåller en fungerande testsida bör den lämnas kvar tills hela kedjan är verifierad.

### Skapa dedikerad nyckel för deploy

På Mac:

```sh
ssh-keygen -t ed25519 -f ~/.ssh/tradgardsdrommar-deploy -N "" -C "github-actions-tradgardsdrommar"
```

Det dedikerade nyckelparet får ingen lösenfras eftersom GitHub Actions behöver använda det utan interaktiv upplåsning. Lägg endast `.pub`-innehållet i serverns `authorized_keys`; spara den **privata** nyckelns innehåll i GitHub Actions Secret `DEPLOY_SSH_KEY` via GitHubs inställningar. Skicka den aldrig i chatt och checka aldrig in den i Git.

Verifiera serverns SSH-hostnyckel via servern, till exempel genom fingeravtrycket från:

```sh
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

Hämta sedan `known_hosts`-raden från en betrodd dator med `ssh-keyscan -t ed25519 217.154.118.103`, kontrollera fingeravtrycket och lägg den verifierade raden i GitHub Secret `DEPLOY_KNOWN_HOSTS`. Hoppa inte över hostnyckelkontrollen.

### GitHub Repository Settings → Secrets and variables → Actions

Variabler:

| Namn | Värde |
| --- | --- |
| `DEPLOY_HOST` | `217.154.118.103` |
| `DEPLOY_USER` | `td-deploy` |
| `DEPLOY_PATH` | `/var/www/tradgardsdrommar.se/public` |

Secrets:

| Namn | Innehåll |
| --- | --- |
| `DEPLOY_SSH_KEY` | Privat deploy-nyckel skapad för GitHub Actions |
| `DEPLOY_KNOWN_HOSTS` | Verifierad hostnyckelrad för VPS:en |

Konfigurera gärna miljön `production` för att kräva godkännande före publicering. Workflowen har redan `environment: production`. Lägg aldrig tokens eller lösenord i webbplatskoden.

## Granska preview och publicera manuellt

1. Ändra innehåll/kod i GitHub och slå ihop ändringen till `main`.
2. Vänta på att **Validate and build** ska vara grön; notera körningens **run-ID** från webbadressen, t.ex. numret efter `/actions/runs/`.
3. Vänta på att **Preview website on GitHub Pages** ska vara grön för samma commit. Granska sedan https://mooody.github.io/pjrepo/ visuellt.
4. Öppna **Actions → Publish approved build to STRATO → Run workflow**. Välj `main` och ange det godkända `build_run_id` i fältet. Starta workflowen manuellt.
5. Publiceringsjobbet kontrollerar att det valda bygg-ID:t verkligen är en slutförd och lyckad `Validate and build` från `main`, hämtar exakt dess `website`-artefakt och skickar bara `dist/` till Nginx dokumentrot via `scripts/deploy.sh`. Ett otillåtet, misslyckat eller för gammalt bygge avvisas.
6. Kontrollera `https://www.tradgardsdrommar.se/` och Nginx-loggarna.

**Observera:** byggartefakten sparas i 7 dagar. Publicera därför inom den tiden, eller kör ett nytt Validate and build och granska dess nya preview. En äldre tidigare godkänd byggversion kan väljas genom dess run-ID så länge artefakten finns kvar. Automatiska uppdateringar av preview förändrar inte produktionswebbplatsen.

Skriptet tillåter av säkerhetsskäl **bara** `DEPLOY_PATH=/var/www/tradgardsdrommar.se/public`. Det testar att `dist/index.html` finns, att SSH-anslutningen fungerar och att målkatalogen redan finns och är skrivbar. Överföring görs med rsync `--delete --delay-updates`. Detta är **inte helt atomärt**; vid stora uppdateringar kan webbplatsen kortvarigt visa en blandning av nya och gamla filer. Om det blir ett problem kan vi senare återgå till versionerade releaser.

`/.well-known/` på servern bevaras vid rsync för eventuell certifikat-/domänverifiering. Övriga filer i public/ som inte längre ingår i `dist/` kan tas bort av rsync.

## Privat repository och GitHub Pages-preview

**Beslut 15 oktober:** behåll GitHub Pages-previewen. Repo `mooody/pjrepo` är fortfarande publikt. Med **GitHub Free** krävs ett *publikt* repository för GitHub Pages; att byta till `Private` skulle alltså göra denna Pages-preview otillgänglig utan uppgradering till en plan som stöder Pages för privata repositories.

GitHub Free tillåter privata kodrepositories. **Uppdatering 16 oktober 2026:** En separat STRATO-webbplats för `preview.tradgardsdrommar.se` har nu skapats, med egen katalog och Nginx-site, HTTPS, Basic Auth samt `robots.txt`/noindex. **GitHub Actions-publicering till denna STRATO-preview finns ännu inte.** Den innehåller tills vidare en testsida. Behåll GitHub Pages tills vi har byggt och verifierat ett separat preview-flöde. Se [SERVER_OPERATIONS.md](SERVER_OPERATIONS.md) för verifierad serverinventering och [CHANGELOG.md](CHANGELOG.md) för ändringshistorik. Ändra inte produktionspubliceringen i samband med detta.

## CMS

Decap CMS ligger statiskt på `/admin/` men kräver en separat OAuth-förmedlare för GitHub-inloggning. Se `docs/oauth.md`. Publicera inte OAuth-hemligheter eller API-token i Git.

## Kontroll och felsökning

```sh
sudo nginx -t
sudo systemctl status nginx
sudo ufw status
curl -I https://www.tradgardsdrommar.se
sudo tail -n 50 /var/log/nginx/tradgardsdrommar.error.log
```

Om manuell deploy misslyckas: läs GitHub Actions-jobbet **Publish approved build to STRATO** och kontrollera `build_run_id`, att den godkända `website`-artefakten fortfarande finns kvar, variabler/secrets, serverns hostnyckel, `rsync` på VPS:en samt skrivrättigheter på `public/`.

Backup är medvetet uppskjuten tills Trädgårdsdrömmar och Weetech är i drift. Kom ihåg att GitHub-historik inte ersätter backup av serverinställningar, privata bildoriginal, CMS-hemligheter eller databaser.
