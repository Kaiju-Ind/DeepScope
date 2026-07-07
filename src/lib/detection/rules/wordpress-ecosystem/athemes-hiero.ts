import type { TechnologyDefinition } from '../../types';

export const athemesHieroTechnologyDefinition = {
	id: "athemes-hiero",
	name: "aThemes Hiero",
	website: "https://athemes.com/theme/hiero",
	description: "aThemes Hiero is an awesome magazine theme for your WordPress site feature bold colors and details to the content.",
	icon: "aThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "athemes-hiero:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/hiero\\/"),
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
