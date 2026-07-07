import type { TechnologyDefinition } from '../../types';

export const twentyTwentyTechnologyDefinition = {
	id: "twenty-twenty",
	name: "Twenty Twenty",
	website: "https://wordpress.org/themes/twentytwenty",
	description: "Twenty Twenty is the default WordPress theme for 2020.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-twenty:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentytwenty\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twenty-twenty:dom:1",
			kind: "dom",
			selector: "link#twentytwenty-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "twenty-twenty:jsGlobal:2",
			kind: "jsGlobal",
			property: "twentytwenty",
			description: "Page-owned global matches a known technology marker.",
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
