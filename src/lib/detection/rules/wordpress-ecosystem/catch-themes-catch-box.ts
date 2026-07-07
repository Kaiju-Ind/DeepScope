import type { TechnologyDefinition } from '../../types';

export const catchThemesCatchBoxTechnologyDefinition = {
	id: "catch-themes-catch-box",
	name: "Catch Themes Catch Box",
	website: "https://catchthemes.com/themes/catch-box",
	description: "Catch Box is a lightweight, box shaped, clean responsive WordPress theme by Catch Themes.",
	icon: "Catch Themes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "catch-themes-catch-box:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/catch-box(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "catch-themes-catch-box:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/catch-box/']",
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
