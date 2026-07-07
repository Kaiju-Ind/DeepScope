import type { TechnologyDefinition } from '../../types';

export const candidThemesFairyTechnologyDefinition = {
	id: "candid-themes-fairy",
	name: "Candid Themes Fairy",
	website: "https://www.candidthemes.com/themes/fairy",
	description: "Fairy is a free and minimal WordPress blog theme by Candid Themes.",
	icon: "Candid Themes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "candid-themes-fairy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/fairy(?:-premium)?\\/.+custom\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
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
