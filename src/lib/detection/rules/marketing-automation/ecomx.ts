import type { TechnologyDefinition } from '../../types';

export const ecomxTechnologyDefinition = {
	id: "ecomx",
	name: "EcomX",
	website: "https://www.ecomx.ai",
	description: "EcomX is a platform that automatically generates SEO-optimized product, collection, and blog content using AI.",
	icon: "EcomX.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ecomx:dom:0",
			kind: "dom",
			selector: "link[href*='app.ecomx.ai/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
