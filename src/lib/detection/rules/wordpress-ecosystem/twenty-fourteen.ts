import type { TechnologyDefinition } from '../../types';

export const twentyFourteenTechnologyDefinition = {
	id: "twenty-fourteen",
	name: "Twenty Fourteen",
	website: "https://wordpress.org/themes/twentyfourteen",
	description: "Twenty Fourteen is the default WordPress theme for 2014.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-fourteen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentyfourteen\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twenty-fourteen:dom:1",
			kind: "dom",
			selector: "link#twentyfourteen-style-css, style#twentyfourteen-lato-css",
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
