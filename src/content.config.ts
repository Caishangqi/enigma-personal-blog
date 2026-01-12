import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			// Category for blog posts (e.g., "Update", "Event")
			category: z.string().optional(),
			// Category color (hex color string, e.g., "#EA323C")
			categoryColor: z.string().optional(),
		}),
});

const tech = defineCollection({
	// Load Markdown files in the `src/content/tech/` directory.
	loader: glob({ base: './src/content/tech', pattern: '**/*.{md,mdx}' }),
	// Schema for tech stack items (About Me section)
	schema: ({ image }) =>
		z.object({
			name: z.string(),                      // Tech name (e.g., "React")
			role: z.string(),                      // Role/title (e.g., "Frontend Framework")
			roleColor: z.string(),                 // Role badge color (e.g., "#61DAFB")
			description: z.string(),               // Description text
			icon: image(),                         // Small icon for selector
			portrait: image(),                     // Large portrait image
			order: z.number().default(0),          // Display order
		}),
});

export const collections = { blog, tech };
