import type { TechnologyDefinition } from '../../types';

export const themebeezCreamMagazineTechnologyDefinition = {
	id: "themebeez-cream-magazine",
	name: "Themebeez Cream Magazine",
	website: "https://themebeez.com/themes/cream-magazine",
	description: "Cream Magazine is a news and magazine WordPress theme by Themebeez.",
	icon: "Themebeez.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themebeez-cream-magazine:jsGlobal:0",
			kind: "jsGlobal",
			property: "cream_magazine_script_obj",
			description: "Page-owned global matches a known technology marker.",
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
