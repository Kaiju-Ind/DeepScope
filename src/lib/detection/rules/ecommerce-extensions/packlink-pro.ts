import type { TechnologyDefinition } from '../../types';

export const packlinkProTechnologyDefinition = {
	id: "packlink-pro",
	name: "Packlink PRO",
	website: "https://apps.shopify.com/packlink-pro",
	description: "Packlink PRO is a multicarrier shipping solutions for ecommerce and marketplaces.",
	icon: "Packlink.png",
	categories: [
		"ecommerce-extensions",
		"commerce-operations",
	],
	rules: [
		{
			id: "packlink-pro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("packlink-spf-pro\\.appspot\\.com\\/.+myshopify\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
