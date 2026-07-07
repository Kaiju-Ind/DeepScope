import type { TechnologyDefinition } from '../../types';

export const twentyTwentyOneTechnologyDefinition = {
	id: "twenty-twenty-one",
	name: "Twenty Twenty-One",
	website: "https://wordpress.org/themes/twentytwentyone",
	description: "Twenty Twenty-One is the default WordPress theme for 2021.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-twenty-one:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentytwentyone\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twenty-twenty-one:dom:1",
			kind: "dom",
			selector: "link#twenty-twenty-one-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "twenty-twenty-one:jsGlobal:2",
			kind: "jsGlobal",
			property: "twentytwentyoneCollapseMenuOnClickOutside",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "twenty-twenty-one:jsGlobal:3",
			kind: "jsGlobal",
			property: "twentytwentyoneResponsiveEmbeds",
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
