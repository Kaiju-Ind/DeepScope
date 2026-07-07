import type { TechnologyDefinition } from '../../types';

export const simplioUpsellsTechnologyDefinition = {
	id: "simplio-upsells",
	name: "Simplio Upsells",
	website: "https://apps.shopify.com/simple-promotions-and-upsells",
	description: "Simplio Upsells сreate more revenue with promotions and post purchase upsells.",
	icon: "Simplio Upsells.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "simplio-upsells:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/upsell\\.simplio\\.app\\/"),
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
