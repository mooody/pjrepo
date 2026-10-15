import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { contentSchema, productSchema } from './lib/schema';
const collection = (folder: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${folder}` }),
    schema: contentSchema,
  });
export const collections = {
  pages: collection('pages'),
  chilies: collection('chilies'),
  beneficials: collection('beneficials'),
  pests: collection('pests'),
  methods: collection('methods'),
  observations: collection('observations'),
  projects: collection('projects'),
  articles: collection('articles'),
  products: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/products' }),
    schema: productSchema,
  }),
};
