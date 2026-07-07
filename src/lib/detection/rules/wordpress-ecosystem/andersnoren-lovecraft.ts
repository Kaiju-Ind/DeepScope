import type { TechnologyDefinition } from '../../types';

export const andersnorenLovecraftTechnologyDefinition = {
	id: "andersnoren-lovecraft",
	name: "AndersNoren Lovecraft",
	website: "https://andersnoren.se/teman/lovecraft-wordpress-theme",
	description: "AndersNoren Lovecraft is a beautiful two-column WordPress theme for bloggers.",
	icon: "AndersNoren.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "andersnoren-lovecraft:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/lovecraft\\/"),
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
