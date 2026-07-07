import type { TechnologyDefinition } from '../../types';

export const themegrillSpaciousTechnologyDefinition = {
	id: "themegrill-spacious",
	name: "ThemeGrill Spacious",
	website: "https://themegrill.com/themes/spacious",
	description: "ThemeGrill Spacious is beautiful small to medium business responsive WordPress theme.",
	icon: "ThemeGrill.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themegrill-spacious:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/spacious(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "themegrill-spacious:dom:1",
			kind: "dom",
			selector: "link#spacious_style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "themegrill-spacious:jsGlobal:2",
			kind: "jsGlobal",
			property: "spacious_slider_value",
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
