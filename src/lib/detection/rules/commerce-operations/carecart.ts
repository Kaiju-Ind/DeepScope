import type { TechnologyDefinition } from '../../types';

export const carecartTechnologyDefinition = {
	id: "carecart",
	name: "CareCart",
	website: "https://carecart.io/abandoned-cart-recovery-app",
	description: "CareCart is a smart app to recover big value carts on all sizes of shopify stores.",
	icon: "CareCart.png",
	categories: [
		"commerce-operations",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "carecart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.carecart\\.io\\/api\\/abandoned-cart\\/"),
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
