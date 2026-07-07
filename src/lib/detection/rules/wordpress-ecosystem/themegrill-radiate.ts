import type { TechnologyDefinition } from '../../types';

export const themegrillRadiateTechnologyDefinition = {
	id: "themegrill-radiate",
	name: "ThemeGrill Radiate",
	website: "https://themegrill.com/themes/radiate",
	description: "ThemeGrill Radiate is a simple and minimal WordPress theme focused on blogging.",
	icon: "ThemeGrill.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themegrill-radiate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/radiate(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "themegrill-radiate:dom:1",
			kind: "dom",
			selector: "link#radiate-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "themegrill-radiate:jsGlobal:2",
			kind: "jsGlobal",
			property: "radiateScriptParam",
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
