import type { TechnologyDefinition } from '../../types';

export const themezeeWellingtonTechnologyDefinition = {
	id: "themezee-wellington",
	name: "ThemeZee Wellington",
	website: "https://themezee.com/themes/wellington",
	description: "Wellington is a clean and simple magazine WordPress theme by ThemeZee.",
	icon: "ThemeZee.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themezee-wellington:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/wellington\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "themezee-wellington:jsGlobal:1",
			kind: "jsGlobal",
			property: "wellingtonScreenReaderText",
			description: "Page-owned global matches a known technology marker.",
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
