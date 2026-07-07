import type { TechnologyDefinition } from '../../types';

export const colorlibIlldyTechnologyDefinition = {
	id: "colorlib-illdy",
	name: "Colorlib Illdy",
	website: "https://colorlib.com/wp/themes/illdy",
	description: "Colorlib Illdy is a stunning multipurpose WordPress theme built based on Bootstrap frontend framework making it fully responsive and mobile friendly.",
	icon: "Colorlib.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "colorlib-illdy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/illdy\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "colorlib-illdy:dom:1",
			kind: "dom",
			selector: "link#illdy-style-css",
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
