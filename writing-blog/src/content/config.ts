import { z, defineCollection } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    series: z.string().optional(),
    seriesNumber: z.number().optional(),
    description: z.string().optional(),
    hasViz: z.boolean().default(false),
  }),
});

export const collections = { posts };
