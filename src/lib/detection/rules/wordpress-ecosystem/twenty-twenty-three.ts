import type { TechnologyDefinition } from '../../types';

export const twentyTwentyThreeTechnologyDefinition = {
	id: "twenty-twenty-three",
	name: "Twenty Twenty-Three",
	website: "https://wordpress.org/themes/twentytwentythree",
	description: "Twenty Twenty-Three is the default WordPress theme for 2023.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-twenty-three:dom:0",
			kind: "dom",
			selector: "style#webfonts-inline-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "twenty-twenty-three:text:1",
			kind: "text",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentytwentythree\\/assets\\/fonts\\/"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "twenty-twenty-three:dom:2",
			kind: "dom",
			selector: "style#wp-webfonts-inline-css",
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
