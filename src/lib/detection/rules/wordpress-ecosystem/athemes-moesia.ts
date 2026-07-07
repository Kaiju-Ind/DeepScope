import type { TechnologyDefinition } from '../../types';

export const athemesMoesiaTechnologyDefinition = {
	id: "athemes-moesia",
	name: "aThemes Moesia",
	website: "https://athemes.com/theme/moesia",
	description: "aThemes Moesia is the business theme you need in order to build your presence on the Internet.",
	icon: "aThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "athemes-moesia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/moesia(?:-pro-ii)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "athemes-moesia:dom:1",
			kind: "dom",
			selector: "link#moesia-style-css",
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
