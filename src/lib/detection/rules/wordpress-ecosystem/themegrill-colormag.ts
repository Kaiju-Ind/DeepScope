import type { TechnologyDefinition } from '../../types';

export const themegrillColormagTechnologyDefinition = {
	id: "themegrill-colormag",
	name: "ThemeGrill ColorMag",
	website: "https://themegrill.com/themes/colormag",
	description: "ThemeGrill ColorMag is most popular magazine-newspaper style WordPress theme.",
	icon: "ThemeGrill.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themegrill-colormag:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/colormag(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "themegrill-colormag:dom:1",
			kind: "dom",
			selector: "link#colormag_style-css",
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
