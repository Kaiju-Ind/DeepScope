import type { TechnologyDefinition } from '../../types';

export const twentyTwelveTechnologyDefinition = {
	id: "twenty-twelve",
	name: "Twenty Twelve",
	website: "https://wordpress.org/themes/twentytwelve",
	description: "Twenty Twelve is the default WordPress theme for 2012.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-twelve:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentytwelve\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twenty-twelve:dom:1",
			kind: "dom",
			selector: "link#twentytwelve-style-css",
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
