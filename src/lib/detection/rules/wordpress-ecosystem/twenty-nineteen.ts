import type { TechnologyDefinition } from '../../types';

export const twentyNineteenTechnologyDefinition = {
	id: "twenty-nineteen",
	name: "Twenty Nineteen",
	website: "https://wordpress.org/themes/twentynineteen",
	description: "Twenty Nineteen is the default WordPress theme for 2019.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twenty-nineteen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/twentynineteen\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twenty-nineteen:dom:1",
			kind: "dom",
			selector: "link#twentynineteen-style-css",
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
