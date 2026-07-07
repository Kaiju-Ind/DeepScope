import type { TechnologyDefinition } from '../../types';

export const contextualRelatedPostsTechnologyDefinition = {
	id: "contextual-related-posts",
	name: "Contextual Related Posts",
	website: "https://wordpress.org/plugins/contextual-related-posts/",
	description: "Add related posts to your WordPress site with inbuilt caching.",
	icon: "Contextual Related Posts.png",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "contextual-related-posts:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/contextual-related-posts/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
