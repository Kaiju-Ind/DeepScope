import type { TechnologyDefinition } from '../../types';

export const twentySeventeenTechnologyDefinition = {
	id: "twenty-seventeen",
	name: "Twenty Seventeen",
	website: "https://wordpress.org/themes/twentyseventeen",
	description: "Twenty Seventeen is the default WordPress theme for 2017.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-seventeen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentyseventeen\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twenty-seventeen:dom:1",
			kind: "dom",
			selector: "link#twentyseventeen-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "twenty-seventeen:jsGlobal:2",
			kind: "jsGlobal",
			property: "twentyseventeenScreenReaderText",
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
