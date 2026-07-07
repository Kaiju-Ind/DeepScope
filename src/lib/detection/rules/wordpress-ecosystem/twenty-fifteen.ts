import type { TechnologyDefinition } from '../../types';

export const twentyFifteenTechnologyDefinition = {
	id: "twenty-fifteen",
	name: "Twenty Fifteen",
	website: "https://wordpress.org/themes/twentyfifteen",
	description: "Twenty Fifteen is the default WordPress theme for 2015.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-fifteen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentyfifteen\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twenty-fifteen:dom:1",
			kind: "dom",
			selector: "link#twentyfifteen-style-css",
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
