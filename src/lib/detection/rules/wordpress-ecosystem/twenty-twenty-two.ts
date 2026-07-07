import type { TechnologyDefinition } from '../../types';

export const twentyTwentyTwoTechnologyDefinition = {
	id: "twenty-twenty-two",
	name: "Twenty Twenty-Two",
	website: "https://wordpress.org/themes/twentytwentytwo",
	description: "Twenty Twenty-Two is the default WordPress theme for 2022.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-twenty-two:dom:0",
			kind: "dom",
			selector: "link#twentytwentytwo-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "twenty-twenty-two:dom:1",
			kind: "dom",
			selector: "style#webfonts-inline-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "twenty-twenty-two:text:2",
			kind: "text",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentytwentytwo\\/assets\\/fonts\\/"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "twenty-twenty-two:dom:3",
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
