import { z } from 'astro/zod';
const rawSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    example: z.boolean().default(false),
    category: z.string().default(''),
    tags: z.array(z.string()).default([]),
    scientificName: z.string().default(''),
    species: z.string().default(''),
    heatMin: z.number().nonnegative().optional(),
    heatMax: z.number().nonnegative().optional(),
    appearance: z.string().default(''),
    flavor: z.string().default(''),
    origin: z.string().default(''),
    growth: z.string().default(''),
    experiences: z.string().default(''),
    evidence: z
      .enum(['etablerad', 'observation', 'hypotes'])
      .default('etablerad'),
    identification: z.enum(['säker', 'preliminär', 'osäker']).default('säker'),
    reviewed: z.coerce.date().optional(),
    sources: z.array(z.object({ title: z.string(), url: z.url() })).default([]),
    related: z
      .array(z.object({ label: z.string(), href: z.string().startsWith('/') }))
      .default([]),
    gallery: z
      .array(z.object({ image: z.string(), alt: z.string() }))
      .default([]),
    image: z.string().default(''),
    imageAlt: z.string().default(''),
    projectStatus: z
      .enum(['idé', 'planering', 'pågår', 'klart'])
      .default('idé'),
  })
  .refine(
    (d) =>
      d.heatMin === undefined ||
      d.heatMax === undefined ||
      d.heatMin <= d.heatMax,
    { message: 'Scoville: minimum får inte överstiga maximum' },
  );
export const contentSchema = z.preprocess((value) => {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return Object.fromEntries(
      Object.entries(value).filter(([, item]) => item !== null),
    );
  return value;
}, rawSchema);
