import type { TechnologyDefinition } from '../../types';

export const releasitCodFormAndUpsellsTechnologyDefinition = {
	id: "releasit-cod-form-and-upsells",
	name: "Releasit COD Form & Upsells",
	website: "https://www.releas.it/products/releasit-cod-form-upsells",
	description: "Releasit COD Form & Upsells is a Shopify app that replaces the standard checkout with a customizable cash-on-delivery order form and supports upsell features to increase average order value.",
	icon: "Releasit.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "releasit-cod-form-and-upsells:dom:0",
			kind: "dom",
			selector: "script#rsi-cod-form-product-cache",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "releasit-cod-form-and-upsells:jsGlobal:1",
			kind: "jsGlobal",
			property: "RSI_CSS_LOADER",
			description: "Page-owned global matches a known technology marker.",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
