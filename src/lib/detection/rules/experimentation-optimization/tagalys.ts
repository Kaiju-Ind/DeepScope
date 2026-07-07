import type { TechnologyDefinition } from '../../types';

export const tagalysTechnologyDefinition = {
	id: "tagalys",
	name: "Tagalys",
	website: "https://www.tagalys.com",
	description: "Tagalys is an ecommerce personalization software that enables data-driven product discovery, recommendations, and merchandising optimization across online stores.",
	icon: "Tagalys.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "tagalys:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tagalys\\.com"),
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
