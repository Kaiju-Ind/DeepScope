import type { TechnologyDefinition } from '../../types';

export const andersnorenHemingwayTechnologyDefinition = {
	id: "andersnoren-hemingway",
	name: "AndersNoren Hemingway",
	website: "https://andersnoren.se/teman/hemingway-wordpress-theme",
	description: "AndersNoren Hemingway is a clean and beautiful two-column WordPress theme for bloggers.",
	icon: "AndersNoren.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "andersnoren-hemingway:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/hemingway\\/"),
			description: "Script source URL matches a known technology marker.",
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
