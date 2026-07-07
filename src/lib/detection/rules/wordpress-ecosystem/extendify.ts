import type { TechnologyDefinition } from '../../types';

export const extendifyTechnologyDefinition = {
	id: "extendify",
	name: "Extendify",
	website: "https://extendify.com",
	description: "Extendify (formerly Redux framework) is one of the most popular, advanced, and free to use option panel frameworks for WordPress themes and plugins.",
	icon: "Extendify.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "extendify:meta:0",
			kind: "meta",
			key: "framework",
			valuePattern: new RegExp("^Redux ([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "extendify:dom:1",
			kind: "dom",
			selector: "link[href*='/plugins/extendify/'], #extendify-utility-styles-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
