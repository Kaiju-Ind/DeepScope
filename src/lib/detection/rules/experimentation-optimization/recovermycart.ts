import type { TechnologyDefinition } from '../../types';

export const recovermycartTechnologyDefinition = {
	id: "recovermycart",
	name: "RecoverMyCart",
	website: "https://app.recovermycart.com/",
	description: "RecoverMyCart is a Shopify app for abandoned basket recovery.",
	icon: "RecoverMyCart.png",
	categories: [
		"experimentation-optimization",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "recovermycart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.recovermycart\\.com"),
			description: "Script source URL matches a known technology marker.",
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
