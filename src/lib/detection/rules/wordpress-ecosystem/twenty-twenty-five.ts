import type { TechnologyDefinition } from '../../types';

export const twentyTwentyFiveTechnologyDefinition = {
	id: "twenty-twenty-five",
	name: "Twenty Twenty-Five",
	website: "https://wordpress.org/themes/twentytwentyfive",
	description: "Twenty Twenty-Five is the default WordPress theme for 2025.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-twenty-five:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentytwentyfive\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twenty-twenty-five:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/twentytwentyfive/']",
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
