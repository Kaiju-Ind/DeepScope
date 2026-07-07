import type { TechnologyDefinition } from '../../types';

export const envoEcommerceTechnologyDefinition = {
	id: "envo-ecommerce",
	name: "Envo eCommerce",
	website: "https://envothemes.com/free-envo-ecommerce/",
	description: "Envo eCommerce is a fast, clean and modern-looking responsive free WooCommerce theme for WordPress.",
	icon: "Envo Themes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "envo-ecommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/envo-ecommerce\\/.+customscript\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
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
