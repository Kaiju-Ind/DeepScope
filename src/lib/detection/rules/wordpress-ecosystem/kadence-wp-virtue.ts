import type { TechnologyDefinition } from '../../types';

export const kadenceWpVirtueTechnologyDefinition = {
	id: "kadence-wp-virtue",
	name: "Kadence WP Virtue",
	website: "https://www.kadencewp.com/product/virtue-free-theme",
	description: "Kadence WP Virtue is a multipurpose WordPress theme that is available for free download and also offers a pro version.",
	icon: "Kadence WP.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "kadence-wp-virtue:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/virtue\\/.+main-min\\.js(?:\\?ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kadence-wp-virtue:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/virtue/']",
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
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
