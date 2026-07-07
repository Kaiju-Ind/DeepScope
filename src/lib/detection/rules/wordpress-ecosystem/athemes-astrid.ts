import type { TechnologyDefinition } from '../../types';

export const athemesAstridTechnologyDefinition = {
	id: "athemes-astrid",
	name: "aThemes Astrid",
	website: "https://athemes.com/theme/astrid",
	description: "aThemes Astrid is a powerful yet lightweight and flexible WordPress theme.",
	icon: "aThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "athemes-astrid:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/astrid\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "athemes-astrid:dom:1",
			kind: "dom",
			selector: "link#astrid-style-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
