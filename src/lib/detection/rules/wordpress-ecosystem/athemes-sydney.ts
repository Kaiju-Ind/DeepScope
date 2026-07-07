import type { TechnologyDefinition } from '../../types';

export const athemesSydneyTechnologyDefinition = {
	id: "athemes-sydney",
	name: "aThemes Sydney",
	website: "https://athemes.com/theme/sydney",
	description: "aThemes Sydney is a powerful business WordPress theme that provides a fast way for companies or freelancers to create an online presence.",
	icon: "aThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "athemes-sydney:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/sydney(?:-pro-ii)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "athemes-sydney:dom:1",
			kind: "dom",
			selector: "link#sydney-style-css",
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
