import sectionText from '../data/sections.json';
import { getCollection } from 'astro:content';
const definitions = [
  { collection: 'chilies', path: 'chilisorter' },
  { collection: 'beneficials', path: 'nyttodjur' },
  { collection: 'pests', path: 'skadedjur' },
  { collection: 'methods', path: 'odlingsmetoder' },
  { collection: 'observations', path: 'observationer' },
  { collection: 'projects', path: 'projekt' },
  { collection: 'articles', path: 'blogg' },
] as const;
export const sections = definitions.map((section) => ({
  ...section,
  ...sectionText[section.collection],
}));
export async function published(
  collection: (typeof sections)[number]['collection'] | 'pages',
) {
  const entries = await getCollection(collection, ({ data }) => !data.draft);
  return entries.sort(
    (a, b) =>
      (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0) ||
      a.data.title.localeCompare(b.data.title, 'sv'),
  );
}
export const hrefFor = (collection: string, id: string) =>
  `/${sections.find((s) => s.collection === collection)?.path ?? ''}/${id}/`;
export const formatDate = (d: Date) =>
  new Intl.DateTimeFormat('sv-SE', {
    dateStyle: 'long',
    timeZone: 'Europe/Stockholm',
  }).format(d);
