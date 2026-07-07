import type { TechnologyDefinition } from '../../types';

export const futurioTechnologyDefinition = {
	id: "futurio",
	name: "Futurio",
	website: "https://futuriowp.com",
	description: "Futurio is a lightweight and customizable multi-purpose and WooCommerce WordPress theme.",
	icon: "Futurio.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "futurio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/futurio\\/.+customscript\\.js(?:\\?ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "futurio:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/futurio/']",
			description: "DOM selector matches a known technology marker.",
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
