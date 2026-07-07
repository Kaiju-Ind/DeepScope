import type { TechnologyDefinition } from '../../types';

export const twentyThirteenTechnologyDefinition = {
	id: "twenty-thirteen",
	name: "Twenty Thirteen",
	website: "https://wordpress.org/themes/twentythirteen",
	description: "Twenty Thirteen is the default WordPress theme for 2013.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-thirteen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentythirteen\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twenty-thirteen:dom:1",
			kind: "dom",
			selector: "link#twentythirteen-style-css",
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
