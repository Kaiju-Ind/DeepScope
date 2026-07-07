import type { TechnologyDefinition } from '../../types';

export const sirgeTechnologyDefinition = {
	id: "sirge",
	name: "Sirge",
	website: "https://www.sirge.com",
	description: "Sirge is an analytics platform that tracks website visits, customer behavior, and provides insights to optimise return on ad spend (ROAS) and conversions.",
	icon: "Sirge.svg",
	categories: [
		"analytics",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "sirge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.app\\.sirge\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
