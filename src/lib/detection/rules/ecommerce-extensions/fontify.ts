import type { TechnologyDefinition } from '../../types';

export const fontifyTechnologyDefinition = {
	id: "fontify",
	name: "Fontify",
	website: "https://apps.shopify.com/fontify-change-customize-font-for-your-store",
	description: "Fontify allows you to utilise any font without having to alter code.",
	icon: "Fontify.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "fontify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("fontify\\.nitroapps\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
