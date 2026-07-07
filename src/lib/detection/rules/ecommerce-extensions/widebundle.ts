import type { TechnologyDefinition } from '../../types';

export const widebundleTechnologyDefinition = {
	id: "widebundle",
	name: "WideBundle",
	website: "https://en.widebundle.com",
	description: "WideBundle is a Shopify application that allows a merchant to set up bundles on his store.",
	icon: "WideBundle.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "widebundle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/widebundle\\.com\\/"),
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
