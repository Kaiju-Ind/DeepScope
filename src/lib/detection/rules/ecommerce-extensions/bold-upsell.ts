import type { TechnologyDefinition } from '../../types';

export const boldUpsellTechnologyDefinition = {
	id: "bold-upsell",
	name: "Bold Upsell",
	website: "https://boldcommerce.com/upsell",
	description: "Bold Upsell allows the substitution or attachment of products to the customers' carts.",
	icon: "Bold.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "bold-upsell:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("upsells\\.boldapps\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bold-upsell:jsGlobal:1",
			kind: "jsGlobal",
			property: "BOLD.upsell",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
	implies: [
		"bold-commerce",
		"shopify",
	],
} as const satisfies TechnologyDefinition;
