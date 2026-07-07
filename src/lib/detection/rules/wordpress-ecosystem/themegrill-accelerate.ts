import type { TechnologyDefinition } from '../../types';

export const themegrillAccelerateTechnologyDefinition = {
	id: "themegrill-accelerate",
	name: "ThemeGrill Accelerate",
	website: "https://themegrill.com/themes/accelerate",
	description: "ThemeGrill Accelerate is free minimal WordPress theme.",
	icon: "ThemeGrill.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themegrill-accelerate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/accelerate(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "themegrill-accelerate:dom:1",
			kind: "dom",
			selector: "link#accelerate_style-css",
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
