import type { TechnologyDefinition } from '../../types';

export const themezeeDonovanTechnologyDefinition = {
	id: "themezee-donovan",
	name: "ThemeZee Donovan",
	website: "https://themezee.com/themes/donovan",
	description: "ThemeZee Donovan is a flexible, yet easy-to-use blogging WordPress theme.",
	icon: "ThemeZee.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themezee-donovan:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/donovan\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "themezee-donovan:jsGlobal:1",
			kind: "jsGlobal",
			property: "donovanScreenReaderText",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "themezee-donovan:jsGlobal:2",
			kind: "jsGlobal",
			property: "donovan_menu_title",
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
