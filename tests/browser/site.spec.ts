import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('startsida på dator: navigation, tillgänglighet och layout', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Chili att odla',
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole('navigation').getByRole('link', { name: 'Chili', exact: true }).click();
  await expect(page).toHaveURL(/\/chili\/$/);
  await page.getByRole('main').getByRole('link', { name: /Chilisorter/ }).click();
  await expect(page).toHaveURL(/chilisorter/);
});
test('mobilmeny går att öppna, använda och stänga', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Meny' });
  await expect(menu).toBeVisible();
  await expect(page.getByRole('navigation')).toBeHidden();
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Vår historia', exact: true })
    .click();
  await expect(page).toHaveURL(/om/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test('sökning och ämnesfilter visar rätt sorter och tomt resultat', async ({
  page,
}) => {
  await page.goto('/chilisorter/');
  await page.getByRole('searchbox').fill('ghost');
  await expect(page.locator('.search-entry:visible')).toHaveCount(1);
  await expect(page.getByRole('status')).toHaveText('1 träffar');
  await page.getByRole('searchbox').fill('');
  await page.getByLabel('Filtrera efter ämne').selectOption('Capsicum chinense');
  await expect(page.locator('.search-entry:visible')).toHaveCount(6);
  await page.getByRole('searchbox').fill('finnsinte');
  await expect(page.getByText('Inga träffar.')).toBeVisible();
});
test('faktasida är tillgänglig och visar källor', async ({ page }) => {
  await page.goto('/chilisorter/jalapeno-leon/');
  await expect(
    page.getByRole('heading', { name: 'Källor och granskning' }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test('alla chilisorter har samma läsordning och tre grundfakta', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const slug of [
    'habanero', 'habanero-lemon', 'chocolate-habanero', 'red-savina',
    'ghost-pepper', 'carolina-reaper', 'jalapeno-leon', 'pequena-amarilla',
    'sipka-zitronen', 'okrasny-zvonek-red',
  ]) {
    await page.goto(`/chilisorter/${slug}/`);
    await expect(page.locator('.facts dt')).toHaveText([
      'Art', 'Ungefärlig styrka', 'Utseende',
    ]);
    const heat = page.locator('.facts dd').nth(1);
    await expect(heat).toContainText('SHU');
    if (['jalapeno-leon', 'pequena-amarilla', 'sipka-zitronen', 'okrasny-zvonek-red'].includes(slug)) {
      await expect(heat).toHaveText('SHU-intervall saknas');
    } else {
      await expect(heat).toHaveText(/Cirka .+–.+ SHU/);
    }
    await expect(page.locator('.prose h2')).toHaveCount(4);
    await expect(page.locator('.prose h2').nth(1)).toHaveText('Smak och karaktär');
    await expect(page.locator('.prose h2').nth(2)).toHaveText('Odling i Sverige');
    await expect(page.locator('.prose h2').nth(3)).toHaveText('Användning');
    await expect(page.locator('article > .notice')).not.toContainText('SHU');
    await expect(page.locator('article')).not.toContainText('bekräftad av odlaren');
    await expect(page.getByRole('heading', { name: 'Källor och granskning' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test('trädgårdsguiderna visas under Livet i trädgården', async ({ page }) => {
  await page.goto('/biologisk-odling/');
  await expect(page.getByRole('heading', { name: 'Jord och trädgårdsliv' })).toBeVisible();
  await expect(page.locator('section[aria-labelledby="garden-guides-heading"] article h3 a')).toHaveText([
    'Jord – sand, silt, lera och livet under ytan',
    'Täckodling – låt marken vara skyddad',
    'Biologisk mångfald i trädgården',
    'Jordens små arbetare – samspelet under ytan',
    'Från växtrester till jordförbättring – förstå kompostens kretslopp',
    'Täckodling genom året – så anpassar du täcket till odlingen',
    'Förbättra jorden – börja med att undersöka den',
    'Köpejord – vad får du egentligen i säcken?',
    'Efter skörden – vad händer med jorden och mykorrhizan?',
    'Återanvänd krukjorden – bedöm den innan du fyller på',
    'Planera blomningen – fyll luckorna under säsongen',
  ]);
  for (const [slug, title] of [
    ['jord-och-kompost', 'Jord – sand, silt, lera och livet under ytan'],
    ['tackodling', 'Täckodling – låt marken vara skyddad'],
    ['biologisk-mangfald', 'Biologisk mångfald i trädgården'],
    ['jordens-sma-arbetare', 'Jordens små arbetare – samspelet under ytan'],
    ['kompost', 'Från växtrester till jordförbättring – förstå kompostens kretslopp'],
    ['tackodling-genom-aret', 'Täckodling genom året – så anpassar du täcket till odlingen'],
    ['forbattra-jorden', 'Förbättra jorden – börja med att undersöka den'],
    ['kopejord', 'Köpejord – vad får du egentligen i säcken?'],
    ['efter-skorden', 'Efter skörden – vad händer med jorden och mykorrhizan?'],
    ['ateranvand-krukjord', 'Återanvänd krukjorden – bedöm den innan du fyller på'],
    ['blomning-genom-sasongen', 'Planera blomningen – fyll luckorna under säsongen'],
  ]) {
    await expect(
      page.getByRole('link', { name: title, exact: true }),
    ).toHaveAttribute('href', new RegExp(`/odlingsmetoder/${slug}/$`));
    await page.goto(`/odlingsmetoder/${slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page.getByRole('heading', { name: 'Källor och granskning' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Brödsmulor' })
      .getByRole('link', { name: 'Livet i trädgården' })).toHaveAttribute('href', /\/biologisk-odling\/$/);
    await page.goto('/biologisk-odling/');
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('trädgårdsguiderna har korrekta brödsmulor och publicerade bilder', async ({ page }) => {
  for (const [slug, fullImage] of [
    ['jord-och-kompost', 'odlingslott-jord-full-800.webp'],
    ['tackodling', 'tackodling-genomskarning-full-800.webp'],
    ['biologisk-mangfald', 'mangfald-stubbe-full-800.webp'],
    ['tackodling-genom-aret', 'tackodling-hostlov.webp'],
  ]) {
    await page.goto('/odlingsmetoder/' + slug + '/');
    const crumbs = page.getByRole('navigation', { name: 'Brödsmulor' });
    await expect(crumbs.getByRole('link', { name: 'Livet i trädgården' })).toHaveAttribute('href', /\/biologisk-odling\/$/);
    await expect(crumbs).not.toContainText('Startsida');
    const src = await page.locator('article.detail img').first().getAttribute('src');
    expect(src?.endsWith('/media/' + fullImage)).toBe(true);
    await expect(page.locator('article.detail > a.text-link')).toHaveCount(0);
  }
  await page.goto('/biologisk-odling/');
  await expect(page.locator('article.topic img')).toHaveCount(6);
});

test('artiklar visar menybaserad kedja utan Startsida', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [route, labels] of [
      ['/chilisorter/habanero/', ['Chili', 'Chilisorter', 'Habanero Red']],
      ['/nyttodjur/guldogonslandor/', ['Biologiskt växtskydd', 'Nyttodjur', 'Guldögonsländor']],
      ['/odlingsmetoder/att-odla-med-naturen/', ['Biologiskt växtskydd', 'Att odla med naturen i stället för bredvid den']],
    ]) {
      await page.goto(route);
      const crumbs = page.getByRole('navigation', { name: 'Brödsmulor' });
      await expect(crumbs).toBeVisible();
      await expect(crumbs.locator('li')).toHaveCount(labels.length - 1);
      await expect(crumbs).not.toContainText('Startsida');
      await expect(crumbs).not.toContainText(labels[labels.length - 1]);
      await expect(page.locator('article.detail > a.text-link')).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  }
});

test('nyckelpigor har tydliga livsstadier, källor och rätt navigation', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/nyttodjur/nyckelpigor/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nyckelpigor');
    await expect(page.getByRole('navigation', { name: 'Brödsmulor' })
      .getByRole('link', { name: 'Nyttodjur', exact: true })).toBeVisible();
    await expect(page.locator('article.detail .prose')).toContainText('tre benpar');
    await expect(page.locator('article.detail .prose')).toContainText('Coccinella septempunctata');
    await expect(page.locator('article.detail .prose')).toContainText('21,3 °C');
    await expect(page.locator('article.detail .prose')).toContainText('ingen normal utvecklingstid');
    await expect(page.getByRole('heading', { name: 'Källor och granskning' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  }
});

test('guldögonsländans artikel visar läsbilder, förstoring och källor', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/nyttodjur/guldogonslandor/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Guldögonsländor');
    await expect(page.locator('article.detail img')).toHaveCount(4);
    for (const img of await page.locator('article.detail img').all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty('complete', true);
      expect(await img.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
    }
    const fullDiagram = page.getByRole('link', { name: 'Visa större livscykel', exact: true });
    await expect(fullDiagram).toHaveAttribute('href', /\/media\/guldogonslanda-livscykel\.webp$/);
    const response = await page.request.get((await fullDiagram.getAttribute('href'))!);
    expect(response.ok()).toBe(true);
    await expect(page.locator('.prose')).toContainText('bladluslejon');
    await expect(page.locator('.prose')).toContainText('Ingen säker artbestämning');
    for (const label of ['Visa hela äggfotot', 'Visa hela larvfotot']) {
      const photoLink = page.getByRole('link', { name: label, exact: true });
      expect((await page.request.get((await photoLink.getAttribute('href'))!)).ok()).toBe(true);
    }
    await expect(page.locator('img[src$="guldogonslanda-agg-foto-card-800.webp"]')).toHaveCount(1);
    await expect(page.locator('img[src$="guldogonslanda-larv-foto-card-800.webp"]')).toHaveCount(1);
    await expect(page.locator('.prose')).toContainText('laboratorieförsöket');
    await expect(page.locator('.prose')).not.toContainText('Källor och redaktionella anteckningar');
    await expect(page.getByRole('heading', { name: 'Källor och granskning' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('admin initierar CMS med konfigurerad OAuth-förmedlare', async ({ page }) => {
  // Kontrollera bootstrap utan att genomföra riktig GitHub OAuth-inloggning.
  await page.route('**/admin/vendor/decap-cms.js', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: `window.CMS = {
        registerMediaLibrary() {},
        init() { document.body.dataset.cmsInitialized = 'true'; }
      };`,
    }),
  );

  await page.goto('/admin/');
  await expect(page.locator('body')).toHaveAttribute('data-cms-initialized', 'true');
  await expect(page.locator('#cms-status')).toBeHidden();

  const config = await page.request.get('/admin/config.yml');
  expect(config.ok()).toBe(true);
  expect(await config.text()).toContain(
    'base_url: https://sveltia-cms-auth.mikael-forsberg74.workers.dev',
  );
});

test('biologiskt växtskydd samlar djuren och visar kommande texter utan tomma länkar', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    if (width === 390) await page.getByRole('button', { name: 'Meny' }).click();
    await page.getByRole('navigation', { name: 'Huvudmeny' })
      .getByRole('link', { name: 'Biologiskt växtskydd', exact: true }).click();
    await expect(page).toHaveURL(/\/biologiskt-vaxtskydd\/$/);
    const main = page.getByRole('main');
    await expect(main.getByRole('heading', { level: 2 })).toHaveText([
      'Att odla med naturen', 'Näringsväven i odlingen', 'Skadedjur', 'Nyttodjur', 'Köpa in nyttodjur',
    ]);
    await expect(main.getByText('Artikeln kommer.', { exact: true })).toHaveCount(0);
    await expect(main.getByText('Guiderna kommer.', { exact: true })).toBeVisible();
    expect(await main.locator('a').evaluateAll((links) => links.every((link) => {
      const href = link.getAttribute('href');
      return href && href !== '#' && !link.hasAttribute('aria-disabled');
    }))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await main.getByRole('link', { name: 'Att odla med naturen i stället för bredvid den', exact: true }).click();
    await expect(page).toHaveURL(/\/odlingsmetoder\/att-odla-med-naturen\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Att odla med naturen i stället för bredvid den');
    const philosophyImage = page.locator('article.detail img').first();
    await philosophyImage.scrollIntoViewIfNeeded();
    await expect(philosophyImage).toHaveJSProperty('complete', true);
    expect(await philosophyImage.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    await expect(page.locator('article.detail figcaption')).toContainText('AI-genererad illustration');
    await expect(page.getByRole('heading', { name: 'Källor och granskning' })).toBeVisible();
    await expect(page.locator('.sources li')).toHaveCount(4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.getByRole('navigation', { name: 'Brödsmulor' }).getByRole('link', { name: 'Biologiskt växtskydd' }).click();
    await main.getByRole('link', { name: 'Näringsväven i odlingen – vem lever av vem?', exact: true }).click();
    await expect(page).toHaveURL(/\/odlingsmetoder\/naringsvaven-i-odlingen\/$/);
    await expect(page.getByRole('navigation', { name: 'Brödsmulor' }).getByRole('link', { name: 'Biologiskt växtskydd' })).toBeVisible();
    await expect(page.locator('.sources li')).toHaveCount(6);
    await expect(page.locator('article.detail figure')).toHaveCount(3);
    for (const img of await page.locator('article.detail img').all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty('complete', true);
      expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
    }
    await expect(page.locator('article.detail .prose figcaption').first()).toContainText('inte ett dokumenterat födointag');
    if (width === 390) await page.getByRole('button', { name: 'Meny' }).click();
    await expect(page.getByRole('navigation', { name: 'Huvudmeny' })
      .getByRole('link', { name: 'Biologiskt växtskydd', exact: true })).toHaveAttribute('aria-current', 'page');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.getByRole('navigation', { name: 'Brödsmulor' }).getByRole('link', { name: 'Biologiskt växtskydd' }).click();
    await main.getByRole('link', { name: 'Utforska nyttodjuren' }).click();
    await expect(page).toHaveURL(/\/nyttodjur\/$/);
    await expect(page.getByRole('navigation', { name: 'Brödsmulor' }).getByRole('link', { name: 'Biologiskt växtskydd' })).toBeVisible();
    await page.getByRole('heading', { name: 'Guldögonsländor' }).getByRole('link').click();
    await expect(page).toHaveURL(/\/nyttodjur\/guldogonslandor\/$/);
    const crumbs = page.getByRole('navigation', { name: 'Brödsmulor' });
    await expect(crumbs.getByRole('link', { name: 'Biologiskt växtskydd' })).toBeVisible();
    await expect(crumbs.getByRole('link', { name: 'Nyttodjur' })).toHaveAttribute('href', /\/nyttodjur\/$/);
    const breadcrumbData = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(breadcrumbData.join('')).toContain('Biologiskt växtskydd');
    expect(breadcrumbData.join('')).not.toContain('Livet i trädgården');
    if (width === 390) await page.getByRole('button', { name: 'Meny' }).click();
    await expect(page.getByRole('navigation', { name: 'Huvudmeny' })
      .getByRole('link', { name: 'Biologiskt växtskydd', exact: true })).toHaveAttribute('aria-current', 'page');
    await crumbs.getByRole('link', { name: 'Biologiskt växtskydd' }).click();
    await page.getByRole('link', { name: 'Utforska skadedjuren' }).click();
    await expect(page).toHaveURL(/\/skadedjur\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Skadedjur');
    await page.getByRole('navigation', { name: 'Brödsmulor' }).getByRole('link', { name: 'Biologiskt växtskydd' }).click();
    await expect(page).toHaveURL(/\/biologiskt-vaxtskydd\/$/);
  }
});

test('artiklar kan skrivas ut med logga, läsbara bilder och källor', async ({ page }) => {
  for (const route of [
    '/odlingsmetoder/att-odla-med-naturen/',
    '/odlingsmetoder/naringsvaven-i-odlingen/',
    '/nyttodjur/guldogonslandor/',
    '/odlingsmetoder/jordens-sma-arbetare/',
    '/chilifortplantning/',
  ]) {
    await page.emulateMedia({ media: 'screen' });
    await page.goto(route);
    const button = page.getByRole('button', { name: 'Skriv ut / spara som PDF', exact: true });
    await expect(button).toBeVisible();
    await expect(page.locator('article + .article-tools-footer .article-print-button')).toHaveCount(1);
    await expect(page.locator('.print-masthead')).toBeHidden();
    await page.evaluate(() => { window.print = () => { document.body.dataset.printCalled = 'yes'; }; });
    await button.click();
    await expect(page.locator('body')).toHaveAttribute('data-print-called', 'yes');
    for (const img of await page.locator('main img').all()) {
      await expect(img).toHaveJSProperty('complete', true);
      expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
    }
    await page.emulateMedia({ media: 'print' });
    await expect(button).toBeHidden();
    await expect(page.locator('.site-header')).toBeHidden();
    await expect(page.locator('body > footer')).toBeHidden();
    await expect(page.locator('.print-masthead')).toBeVisible();
    await expect(page.locator('.article-tools-footer')).toBeHidden();
    await expect(page.locator('.print-masthead img')).toHaveAttribute('src', /tradgardsdrommar-logo\.webp$/);
    await expect(page.locator('.article-source-url')).toContainText(route);
    expect(await page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor)).toBe('rgb(255, 255, 255)');
    expect(await page.getByRole('heading', { level: 1 }).evaluate((el) => getComputedStyle(el).color)).toBe('rgb(22, 22, 22)');
    await expect(page.locator('article .prose')).toBeVisible();
    if (route !== '/chilifortplantning/') {
      await expect(page.locator('.sources')).toBeVisible();
      expect(await page.locator('.sources a').first().evaluate((el) => getComputedStyle(el, '::after').content)).toContain('https://');
    }
    const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
    expect(pdf.length).toBeGreaterThan(10000);
  }
});

test('alla tretton nyttodjur finns och har spårbara källor', async ({page}) => {
 await page.goto('/nyttodjur/');
 await expect(page.locator('#results .search-entry')).toHaveCount(13);
 for(const slug of ['blomflugor','bladlusgallmygga','parasitsteklar','rovskinnbaggar','jordlopare','rovtrips','minerarflugeparasitoid','rovkvalster-spinn','jordlevande-rovkvalster','nematoder','rovkvalster-trips']){
  await page.goto('/nyttodjur/'+slug+'/');
  await expect(page.getByRole('heading',{name:'Så känner du igen dem'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Roll i odlingen'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Källor och granskning'})).toBeVisible();
  await expect(page.getByRole('navigation',{name:'Brödsmulor'}).getByRole('link',{name:'Nyttodjur'})).toBeVisible();
 }
 await page.setViewportSize({width:390,height:844});
 await page.goto('/nyttodjur/nematoder/');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await expect(page.locator('article + .article-tools-footer button')).toBeVisible();
});

test('alla femton skadedjurssidor visar fakta, källor och korrekt navigering', async ({page}) => {
 await page.goto('/skadedjur/');
 await expect(page.locator('#results .search-entry')).toHaveCount(15);
 const slugs=['grona-bladloss','svarta-bladloss','kalbladlus','trips',
  'spinnkvalster','mjolloss','sorgmyggor','minerarflugor','rovfjaril',
  'stor-kalfjaril','kalmal','kalfly','bredkvalster','skoldloss'];
 for(const slug of slugs){
  await page.goto('/skadedjur/'+slug+'/');
  await expect(page.locator('article.detail h1')).toBeVisible();
  await expect(page.getByRole('heading',{name:'Så känner du igen angreppet'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Naturliga fiender och samspel'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Källor och granskning'})).toBeVisible();
  const breadcrumbs=page.getByRole('navigation',{name:'Brödsmulor'});
  await expect(breadcrumbs.getByRole('link',{name:'Skadedjur'})).toBeVisible();
  await expect(breadcrumbs).not.toContainText('Startsida');
 }
 await page.setViewportSize({width:390,height:844});
 await page.goto('/skadedjur/bredkvalster/');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await expect(page.locator('article + .article-tools-footer button')).toBeVisible();
});

test('nyttodjur har två läsargrupper inom befintlig samling', async ({ page }) => {
  await page.goto('/nyttodjur/');
  const natural = page.locator('#naturliga-nyttodjur');
  const purchased = page.locator('#biologisk-bekampning');
  await expect(natural.getByRole('heading',{name:'Naturliga nyttodjur'})).toBeVisible();
  await expect(purchased.getByRole('heading',{name:'Nyttodjur för biologisk bekämpning'})).toBeVisible();
  await expect(natural.locator('.search-entry')).toHaveCount(8);
  await expect(purchased.locator('.search-entry')).toHaveCount(5);
  await page.locator('#search').fill('jordlöpare');
  await expect(natural).toBeVisible();
  await expect(purchased).toBeHidden();
  await expect(page.locator('#count')).toContainText('1');
  await page.locator('#search').fill('rovkvalster');
  await expect(natural).toBeHidden();
  await expect(purchased).toBeVisible();
});

test('artiklarnas ingress upprepas inte och grupperna har olika upplägg', async ({ page }) => {
  for(const [route, heading] of [
    ['/nyttodjur/blomflugor/', 'Miljö genom säsongen och övervintring'],
    ['/nyttodjur/jordlopare/', 'Miljö genom säsongen och övervintring'],
    ['/nyttodjur/nematoder/', 'Målskadegörare och stadier'],
    ['/nyttodjur/rovkvalster-spinn/', 'Så följer du resultatet'],
    ['/skadedjur/spinnkvalster/', 'Så känner du igen angreppet'],
    ['/skadedjur/kalbladlus/', 'Miljö, riskperioder och övervintring']
  ]){
    await page.goto(route);
    await expect(page.getByRole('heading', {name: heading})).toBeVisible();
    const ingress=(await page.locator('article .lead').textContent())?.trim()||'';
    const article=(await page.locator('article .prose').textContent())||'';
    expect(article).not.toContain(ingress);
    const breadcrumbs=page.getByRole('navigation',{name:'Brödsmulor'});
    await expect(breadcrumbs).not.toContainText(await page.locator('article h1').innerText());
  }
});

test('befintliga vattenstämplade bilder används i rätt sammanhang', async ({page}) => {
  for(const [route, image] of [
    ['/skadedjur/bladloss/', 'guldogonslanda-larv-foto-full-800.webp'],
    ['/nyttodjur/jordlopare/', 'mangfald-stubbe-full-800.webp'],
    ['/nyttodjur/blomflugor/', 'mangfald-nyttodjur-full-800.webp']
  ]){
    await page.goto(route);
    const img=page.locator('article .prose img[src*="'+image+'"]');
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute('alt', /.+/);
    expect(await img.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(img.locator('xpath=..').locator('xpath=..').getByText(/illustration|foto|miljöbild/i)).toBeVisible();
  }
});
