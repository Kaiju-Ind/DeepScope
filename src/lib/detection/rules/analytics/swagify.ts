import type { TechnologyDefinition } from '../../types';

export const swagifyTechnologyDefinition = {
	id: "swagify",
	name: "Swagify",
	website: "https://swagifyapp.com",
	description: "Swagify allows you to upsell, cross-sell, and promote, by creating as many completely customizable offers as you want.",
	icon: "Swagify.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "swagify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.swagifyapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "swagify:jsGlobal:1",
			kind: "jsGlobal",
			property: "Swagify",
			description: "Page-owned global matches a known technology marker.",
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
