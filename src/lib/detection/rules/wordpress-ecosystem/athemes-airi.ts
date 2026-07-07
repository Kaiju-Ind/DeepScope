import type { TechnologyDefinition } from '../../types';

export const athemesAiriTechnologyDefinition = {
	id: "athemes-airi",
	name: "aThemes Airi",
	website: "https://athemes.com/theme/airi",
	description: "aThemes Airi is a powerful yet lightweight and flexible WordPress theme for organization or freelancer.",
	icon: "aThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "athemes-airi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/airi\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "athemes-airi:dom:1",
			kind: "dom",
			selector: "link#airi-style-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
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
