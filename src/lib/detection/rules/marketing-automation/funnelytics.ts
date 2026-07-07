import type { TechnologyDefinition } from '../../types';

export const funnelyticsTechnologyDefinition = {
	id: "funnelytics",
	name: "Funnelytics",
	website: "https://funnelytics.io",
	description: "Funnelytics is a tool designed to increase lead and customer conversions by optimizing marketing funnels for better performance and results.",
	icon: "Funnelytics.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "funnelytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.funnelytics\\.io\\/"),
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
