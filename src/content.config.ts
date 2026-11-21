import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const writeups = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/writeups' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    slug: slug.optional(),
    tags: z.array(z.string()).default([]),
    platform: z.string().optional(),
    difficulty: z.string().optional(),
    published: z.boolean().default(true)
  })
});

const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().min(1),
    eyebrow: z.string().max(80).default(''),
    description: z.string().max(320).default('')
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    name: z.string().min(1),
    slug,
    description: z.string().min(1),
    status: z.enum(['alive', 'tinkering', 'abandoned', 'idea']).default('tinkering'),
    link: z.string().max(300).optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().int().min(0).default(100),
    published: z.boolean().default(true)
  })
});

export const collections = { writeups, pages, projects };
