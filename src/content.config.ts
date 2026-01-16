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

const project = defineCollection({
	// Load Markdown and MDX files in the `src/content/project/` directory.
	loader: glob({ base: './src/content/project', pattern: '**/*.{md,mdx}' }),
	// Schema for project items
	schema: ({ image }) =>
		z.object({
			// Required fields
			title: z.string(),                       // Project title
			pubDate: z.coerce.date(),                // Publication date

			// Optional metadata
			description: z.string().optional(),      // Short description for card/SEO
			updatedDate: z.coerce.date().optional(), // Last update date

			// Images
			heroImage: image().optional(),           // Main banner image (16:9 recommended)
			iconImage: image().optional(),           // Small icon for project card (square)

			// Categorization
			category: z.string().optional(),         // e.g., "Group Project", "Personal", "Open Source"
			categoryColor: z.string().optional(),    // Category badge color (hex, e.g., "#3B82F6")
			tags: z.array(z.string()).optional(),    // Tech tags (e.g., ["C++", "Linux", "OpenGL"])

			// External links (1-4 links supported)
			links: z.array(z.object({
				name: z.string(),                    // Link display name (e.g., "Github", "Steam", "Itch.io")
				url: z.string().url(),               // Full URL
			})).max(4).optional(),
		}),
});

export const collections = { blog, tech, project };
