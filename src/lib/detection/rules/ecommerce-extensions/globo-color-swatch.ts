import type { TechnologyDefinition } from '../../types';

export const globoColorSwatchTechnologyDefinition = {
	id: "globo-color-swatch",
	name: "Globo Color Swatch",
	website: "https://apps.shopify.com/globo-related-products",
	description: "Globo Color Swatch app gives you an easy-to-use tool to display product variants on both collection page, homepage and product page creatively as a means to enhance customers' experience and stimulate them to purchase.",
	icon: "Globo apps.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "globo-color-swatch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\/globo\\.swatch\\.data\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
