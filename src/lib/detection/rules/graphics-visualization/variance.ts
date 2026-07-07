import type { TechnologyDefinition } from '../../types';

export const varianceTechnologyDefinition = {
	id: "variance",
	name: "Variance",
	website: "https://variancecharts.com",
	description: "Variance is a provider of custom charting data graphics tools for web platforms, utilizing HTML and CSS.",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "variance:dom:0",
			kind: "dom",
			selector: "link[href*='variancecharts.com/'], script#variance-js",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
