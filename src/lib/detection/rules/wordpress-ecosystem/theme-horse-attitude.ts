import type { TechnologyDefinition } from '../../types';

export const themeHorseAttitudeTechnologyDefinition = {
	id: "theme-horse-attitude",
	name: "Theme Horse Attitude",
	website: "https://www.themehorse.com/themes/attitude",
	description: "Attitude is a simple, clean and responsive retina ready WordPress theme by Theme Horse.",
	icon: "Theme Horse.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "theme-horse-attitude:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/attitude(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "theme-horse-attitude:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/attitude-pro/']",
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
