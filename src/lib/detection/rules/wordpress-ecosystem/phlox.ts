import type { TechnologyDefinition } from '../../types';

export const phloxTechnologyDefinition = {
	id: "phlox",
	name: "Phlox",
	website: "https://www.phlox.pro",
	description: "Phlox is a modern, lightweight and customizable WordPress theme gratify for almost any type of website.",
	icon: "Phlox.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "phlox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/phlox(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "phlox:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/phlox/'], link[href*='/wp-content/themes/phlox-pro/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
		],
		cpe: "cpe:2.3:a:averta:phlox:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
