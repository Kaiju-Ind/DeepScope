import type { TechnologyDefinition } from '../../types';

export const attractaTechnologyDefinition = {
	id: "attracta",
	name: "Attracta",
	website: "https://www.attracta.com",
	description: "Attracta is a platform offering SEO tools designed to optimize website visibility and improve search engine rankings.",
	icon: "Attracta.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "attracta:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.attracta\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
