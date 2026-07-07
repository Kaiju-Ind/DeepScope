import type { TechnologyDefinition } from '../../types';

export const catchThemesFotografieTechnologyDefinition = {
	id: "catch-themes-fotografie",
	name: "Catch Themes Fotografie",
	website: "https://catchthemes.com/themes/fotografie",
	description: "Fotografie is a modern photography WordPress theme that comes with high-quality features and minimal design by Catch Themes.",
	icon: "Catch Themes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "catch-themes-fotografie:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/fotografie(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "catch-themes-fotografie:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/fotografie/']",
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
