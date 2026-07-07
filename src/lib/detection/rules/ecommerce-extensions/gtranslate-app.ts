import type { TechnologyDefinition } from '../../types';

export const gtranslateAppTechnologyDefinition = {
	id: "gtranslate-app",
	name: "GTranslate app",
	website: "https://apps.shopify.com/multilingual-shop-by-gtranslate",
	description: "GTranslate app is a website translator which can translate any website to any language automatically.",
	icon: "GTranslate.svg",
	categories: [
		"ecommerce-extensions",
		"translations",
	],
	rules: [
		{
			id: "gtranslate-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("gtranslate\\.io\\/shopify\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gtranslate-app:dom:1",
			kind: "dom",
			selector: "img[src*='gtranslate.io/shopify']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
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
