import type { TechnologyDefinition } from '../../types';

export const themeHorseNewscardTechnologyDefinition = {
	id: "theme-horse-newscard",
	name: "Theme Horse NewsCard",
	website: "https://www.themehorse.com/themes/newscard",
	description: "NewsCard is a multi-purpose magazine/news WordPress theme by Theme Horse.",
	icon: "Theme Horse.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "theme-horse-newscard:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/newscard(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "theme-horse-newscard:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/newscard-pro/']",
			description: "DOM selector matches a known technology marker.",
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
