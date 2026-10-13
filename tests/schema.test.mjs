import test from 'node:test';
import assert from 'node:assert/strict';
import { contentSchema } from '../src/lib/schema.ts';
const basic = { title: 'Test', description: 'En beskrivning' };
test('ogiltig styrka, datum och kunskapskategori stoppas', () => {
  for (const extra of [
    { heatMin: 400, heatMax: 100 },
    { heatMin: -10 },
    { date: 'inte ett datum' },
    { evidence: 'gissning' },
    { identification: 'okänd' },
  ])
    assert.equal(
      contentSchema.safeParse({ ...basic, ...extra }).success,
      false,
    );
});
test('valfria tomma CMS-fält normaliseras och utkast behålls', () => {
  const data = contentSchema.parse({
    ...basic,
    draft: true,
    date: null,
    image: null,
    tags: null,
  });
  assert.equal(data.draft, true);
  assert.equal(data.date, undefined);
  assert.equal(data.image, '');
  assert.deepEqual(data.tags, []);
});
test('källor och interna relaterade länkar valideras', () => {
  assert.equal(
    contentSchema.safeParse({
      ...basic,
      sources: [{ title: 'Källa', url: 'ingen-url' }],
    }).success,
    false,
  );
  assert.equal(
    contentSchema.safeParse({
      ...basic,
      related: [{ label: 'Länk', href: 'https://example.com' }],
    }).success,
    false,
  );
});
