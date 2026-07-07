import type { TechnologyDefinition } from '../../types';

export const ecomscoutTechnologyDefinition = {
	id: "ecomscout",
	name: "EcomScout",
	website: "https://ecomscout.io",
	description: "EcomScout is a platform providing AI-powered tools for analytics, attribution, merchandising, and forecasting.",
	icon: "EcomScout.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "ecomscout:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.ecomscout\\.io\\/"),
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
} as const satisfies TechnologyDefinition;
