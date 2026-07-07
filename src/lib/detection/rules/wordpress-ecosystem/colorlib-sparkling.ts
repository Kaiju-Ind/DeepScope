import type { TechnologyDefinition } from '../../types';

export const colorlibSparklingTechnologyDefinition = {
	id: "colorlib-sparkling",
	name: "Colorlib Sparkling",
	website: "https://colorlib.com/wp/themes/sparkling",
	description: "Colorlib Sparkling is a clean, modern, flat design WordPress theme developed using Bootstrap.",
	icon: "Colorlib.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "colorlib-sparkling:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/sparkling\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "colorlib-sparkling:dom:1",
			kind: "dom",
			selector: "link#sparkling-style-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
