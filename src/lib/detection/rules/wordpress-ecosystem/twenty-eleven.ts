import type { TechnologyDefinition } from '../../types';

export const twentyElevenTechnologyDefinition = {
	id: "twenty-eleven",
	name: "Twenty Eleven",
	website: "https://wordpress.org/themes/twentyeleven",
	description: "Twenty Eleven is the default WordPress theme for 2011.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-eleven:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/twentyeleven/']",
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
