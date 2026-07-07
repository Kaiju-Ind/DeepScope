import type { TechnologyDefinition } from '../../types';

export const cjdropshippingAppTechnologyDefinition = {
	id: "cjdropshipping-app",
	name: "CJDropshipping app",
	website: "https://apps.shopify.com/cucheng",
	description: "CJDropshipping is a dropshipping supplier and fulfillment service from China.",
	icon: "CJDropshipping.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "cjdropshipping-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.cjdropshipping\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
