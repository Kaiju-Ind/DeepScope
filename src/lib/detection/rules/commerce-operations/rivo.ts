import type { TechnologyDefinition } from '../../types';

export const rivoTechnologyDefinition = {
	id: "rivo",
	name: "Rivo",
	website: "https://www.rivo.io",
	description: "Rivo is a Shopify loyalty and referrals platform.",
	icon: "Rivo.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "rivo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shopify\\.com\\/extensions\\/[^/]+\\/rivo-loyalty-rewards-referrals-\\d+\\/assets\\/rivo-app-embed\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
