import type { TechnologyDefinition } from '../../types';

export const mysterythemesNewsPortalTechnologyDefinition = {
	id: "mysterythemes-news-portal",
	name: "MysteryThemes News Portal",
	website: "https://mysterythemes.com/wp-themes/news-portal",
	description: "News Portal is the ultimate magazine WordPress theme by MysteryThemes.",
	icon: "MysteryThemes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "mysterythemes-news-portal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/news-portal(?:-pro)?\\/.+np-custom-scripts\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
