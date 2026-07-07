import type { TechnologyDefinition } from '../../types';

export const envoShopTechnologyDefinition = {
	id: "envo-shop",
	name: "Envo Shop",
	website: "https://envothemes.com/free-envo-shop",
	description: "Envo Shop is a fast, clean and modern-looking responsive free WooCommerce WordPress theme by Envo Themes.",
	icon: "Envo Themes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "envo-shop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/envo-shop\\/.+customscript\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
