import type { TechnologyDefinition } from '../../types';

export const cryoutCreationsParabolaTechnologyDefinition = {
	id: "cryout-creations-parabola",
	name: "Cryout Creations Parabola",
	website: "https://www.cryoutcreations.eu/wordpress-themes/parabola",
	description: "Parabola is an fully responsive, clean and elegant design WordPress theme created by Cryout Creations.",
	icon: "Cryout Creations.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "cryout-creations-parabola:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/parabola\\/.+frontend\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cryout-creations-parabola:dom:1",
			kind: "dom",
			selector: "link#parabola-style-css, img[src*='/wp-content/themes/parabola/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cryout-creations-parabola:jsGlobal:2",
			kind: "jsGlobal",
			property: "parabola_mobilemenu_init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cryout-creations-parabola:jsGlobal:3",
			kind: "jsGlobal",
			property: "parabola_settings",
			description: "Page-owned global matches a known technology marker.",
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
