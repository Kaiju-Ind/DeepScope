import type { TechnologyDefinition } from '../../types';

export const themegrillFlashTechnologyDefinition = {
	id: "themegrill-flash",
	name: "ThemeGrill Flash",
	website: "https://themegrill.com/themes/flash",
	description: "ThemeGrill Flash is one of the most flexible multipurpose WordPress themes.",
	icon: "ThemeGrill.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themegrill-flash:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/flash(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "themegrill-flash:dom:1",
			kind: "dom",
			selector: "link[href='/wp-content/themes/flash']",
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
