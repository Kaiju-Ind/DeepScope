import type { TechnologyDefinition } from '../../types';

export const twentyTwentyFourTechnologyDefinition = {
	id: "twenty-twenty-four",
	name: "Twenty Twenty-Four",
	website: "https://wordpress.org/themes/twentytwentyfour",
	description: "Twenty Twenty-Four is the default WordPress theme for 2024.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-twenty-four:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentytwentyfour\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twenty-twenty-four:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/twentytwentyfour/']",
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
