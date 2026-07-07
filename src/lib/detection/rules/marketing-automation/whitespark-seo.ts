import type { TechnologyDefinition } from '../../types';

export const whitesparkSeoTechnologyDefinition = {
	id: "whitespark-seo",
	name: "Whitespark SEO",
	website: "https://whitespark.ca/seo-services",
	description: "Aims to help improve rankings and drive business via Google Search.",
	icon: "Whitespark.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "whitespark-seo:dom:0",
			kind: "dom",
			selector: "script[data-gfspw*='rb.whitespark.ca'], div[data-url*='rb.whitespark.ca']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
