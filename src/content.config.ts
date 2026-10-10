import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        // false keeps the page out of the assistant bundle.
        assistant: z.boolean().optional(),
        // App route the page documents, and that screen's visible name.
        app_path: z.string().optional(),
        app_label: z.string().optional(),
      }),
    }),
  }),
};
