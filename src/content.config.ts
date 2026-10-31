import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import fs from 'node:fs';

// Fails the build if a photo listed in YAML is missing from public/images/<folder>/
const photo = (folder: string) =>
  z.string().refine((f) => fs.existsSync(`./public/images/${folder}/${f}`), (f) => ({
    message: `Image "${f}" not found in public/images/${folder}/`,
  }));

// Each product is one YAML file in src/content/products/. The file name becomes the page URL.
const products = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    price: z.number().positive(),
    compareAtPrice: z.number().positive().optional(), // original price, shown struck through
    shape: z.enum(['almond', 'squoval', 'coffin', 'square', 'stiletto', 'oval']),
    length: z.enum(['short', 'medium', 'long']),
    style: z.array(z.string()).default([]),
    images: z.array(photo('products')).min(1), // file names in public/images/products/
    description: z.string(),
    featured: z.boolean().default(false), // shown under "Hot right now" on the home page
    available: z.boolean().default(true), // false shows "Sold out"
    sizes: z.array(z.string()).default(['XS', 'S', 'M', 'L']),
    order: z.number().default(100), // lower numbers appear first
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/services' }),
  schema: z
    .object({
      name: z.string(),
      category: z.string(),
      price: z.number().optional(),
      priceFrom: z.number().optional(), // shows "From ₹…"
      duration: z.string().optional(),
      description: z.string(),
      image: photo('services').optional(),
      order: z.number().default(100),
    })
    .refine((s) => s.price !== undefined || s.priceFrom !== undefined, {
      message: 'Each service needs either "price" or "priceFrom"',
    }),
});

const shapes = defineCollection({
  loader: file('./src/content/shapes.yaml'),
  schema: z.object({ name: z.string(), description: z.string(), image: photo('shapes') }),
});

const faq = defineCollection({
  loader: file('./src/content/faq.yaml'),
  schema: z.object({ section: z.string(), question: z.string(), answer: z.string() }),
});

export const collections = { products, services, shapes, faq };
