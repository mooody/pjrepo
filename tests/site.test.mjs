import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import YAML from 'yaml';
async function files(folder) {
  const result = [];
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = resolve(folder, entry.name);
    if (entry.isDirectory()) result.push(...(await files(path)));
    else result.push(path);
  }
  return result;
}
test('alla interna länkar och bildfiler i byggda sidor finns', async () => {
  const pages = (await files('dist')).filter((p) => p.endsWith('.html'));
  assert.ok(pages.length >= 30);
  for (const file of pages) {
    const html = await readFile(file, 'utf8');
    for (const match of html.matchAll(
      /(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g,
    )) {
      const path = match[1];
      if (path.startsWith('//')) continue;
      const target = resolve(
        'dist',
        `.${path}`,
        path.endsWith('/') ? 'index.html' : '',
      );
      await assert.doesNotReject(access(target), `${file}: ${path}`);
    }
  }
});
test('utkast och originalbilder publiceras inte; metadata och sitemap finns', async () => {
  await assert.rejects(
    access('dist/observationer/exempel-observation/index.html'),
  );
  await assert.rejects(access('dist/private-images'));
  const publicImages = JSON.parse(await readFile('src/data/images.json', 'utf8')).images;
  assert.ok(publicImages.length > 0);
  assert.ok(publicImages.every(i => !i.source));
  const imageConfig = YAML.parse(await readFile('public/admin/config.yml','utf8')).collections.find(c=>c.name==='configuration').files.find(f=>f.name==='images');
  assert.ok(imageConfig.fields[0].fields.every(f=>f.widget!=='image'));

  for (const name of ['sitemap-index.xml', 'sitemap-0.xml', 'robots.txt'])
    await access(`dist/${name}`);
  const html = await readFile('dist/index.html', 'utf8');
  assert.match(html, /<html[^>]+lang="sv"/);
  assert.match(html, /name="description"/);
  assert.match(html, /rel="canonical"/);
  assert.doesNotMatch(html, /google-analytics|googletagmanager/);
});
test('CMS använder rätt repo, redaktionellt flöde och alla innehållssamlingar', async () => {
  const config = YAML.parse(await readFile('public/admin/config.yml', 'utf8'));
  assert.equal(config.backend.repo, 'mooody/pjrepo');
  assert.equal(config.backend.branch, 'main');
  assert.equal(config.publish_mode, 'editorial_workflow');
  assert.equal(config.locale, 'sv');
  for (const name of [
    'pages',
    'articles',
    'chilies',
    'beneficials',
    'pests',
    'methods',
    'observations',
    'projects',
    'configuration',
  ])
    assert.ok(config.collections.find((c) => c.name === name));
  for (const collection of config.collections.filter((c) => c.folder)) {
    await access(collection.folder);
    for (const file of await readdir(collection.folder)) {
      if (!file.endsWith('.md')) continue;
      const text = await readFile(resolve(collection.folder, file), 'utf8');
      const data = YAML.parse(text.split(/^---\s*$/m)[1]);
      for (const field of collection.fields.filter(
        (f) =>
          f.required !== false && f.default === undefined && f.name !== 'body',
      ))
        assert.notEqual(data[field.name], undefined, `${file}: ${field.name}`);
    }
  }
});
