import type { TechnologyDefinition } from '../../types';

export const twentyTenTechnologyDefinition = {
	id: "twenty-ten",
	name: "Twenty Ten",
	website: "https://wordpress.org/themes/twentyten",
	description: "Twenty Ten is the default WordPress theme for 2010.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-ten:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentyten\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twenty-ten:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/twentyten/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
