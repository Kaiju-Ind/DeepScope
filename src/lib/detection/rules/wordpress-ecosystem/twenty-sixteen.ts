import type { TechnologyDefinition } from '../../types';

export const twentySixteenTechnologyDefinition = {
	id: "twenty-sixteen",
	name: "Twenty Sixteen",
	website: "https://wordpress.org/themes/twentysixteen",
	description: "Twenty Sixteen is the default WordPress theme for 2016.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-sixteen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentysixteen\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twenty-sixteen:dom:1",
			kind: "dom",
			selector: "link#twentysixteen-style-css",
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
