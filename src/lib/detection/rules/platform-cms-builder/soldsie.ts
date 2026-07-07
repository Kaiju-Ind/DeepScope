import type { TechnologyDefinition } from '../../types';

export const soldsieTechnologyDefinition = {
	id: "soldsie",
	name: "Soldsie",
	website: "https://soldsie.com",
	description: "Soldsie is a social commerce platform that allows customers to purchase products through comments on social media platforms such as Facebook, Instagram, and Pinterest.",
	icon: "Soldsie.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "soldsie:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("lib\\.soldsie\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
