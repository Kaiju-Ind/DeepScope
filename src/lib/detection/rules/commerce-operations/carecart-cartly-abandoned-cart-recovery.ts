import type { TechnologyDefinition } from '../../types';

export const carecartCartlyAbandonedCartRecoveryTechnologyDefinition = {
	id: "carecart-cartly-abandoned-cart-recovery",
	name: "CareCart Cartly Abandoned Cart Recovery",
	website: "https://carecart.io/cartly-abandoned-cart-recovery/",
	description: "Cartly Abandoned Cart Recovery by CareCart is a service that helps ecommerce businesses recover lost sales by sending automated reminders to customers who abandon their shopping carts.",
	icon: "CareCart.svg",
	categories: [
		"commerce-operations",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "carecart-cartly-abandoned-cart-recovery:scriptSrc:0",
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
