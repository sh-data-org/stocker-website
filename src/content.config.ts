import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { SECTIONS } from './lib/site';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(SECTIONS),
    category: z.string(),
    date: z.iso.date(),
    image: z.enum([
      'research',
      'phones',
      'chips',
      'retail',
      'dataCenter',
      'exchange',
    ]),
    imageAlt: z.string(),
    imageCredit: z
      .object({ photographer: z.string(), url: z.url() })
      .optional(),
    order: z.number(),
    disclosure: z.string().optional(),
    cta: z.string().default('Find your next company to research.'),
    sources: z.array(z.object({ title: z.string(), url: z.url() })).min(1),
  }),
});

export const collections = { articles };
