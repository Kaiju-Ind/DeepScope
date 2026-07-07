import type { TechnologyDefinition } from '../../types';

export const recomifyTechnologyDefinition = {
	id: "recomify",
	name: "Recomify",
	website: "https://www.recomify.com",
	description: "Recomify is a 1-click install, cost-effective smart product recommendation engine.",
	icon: "Recomify.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "recomify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.recomify\\.com\\/"),
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
