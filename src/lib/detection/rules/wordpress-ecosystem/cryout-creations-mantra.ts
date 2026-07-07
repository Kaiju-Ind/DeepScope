import type { TechnologyDefinition } from '../../types';

export const cryoutCreationsMantraTechnologyDefinition = {
	id: "cryout-creations-mantra",
	name: "Cryout Creations Mantra",
	website: "https://www.cryoutcreations.eu/wordpress-themes/mantra",
	description: "Mantra is a do-it-yourself WordPress theme, featuring a pack of over 100 customization option created by Cryout Creations.",
	icon: "Cryout Creations.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "cryout-creations-mantra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/mantra(?:-plus)?\\/.+frontend\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cryout-creations-mantra:dom:1",
			kind: "dom",
			selector: "link#mantra-style-css, img[src*='/wp-content/themes/mantra/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cryout-creations-mantra:jsGlobal:2",
			kind: "jsGlobal",
			property: "mantra_mobilemenu_init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cryout-creations-mantra:jsGlobal:3",
			kind: "jsGlobal",
			property: "mantra_onload",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cryout-creations-mantra:jsGlobal:4",
			kind: "jsGlobal",
			property: "mantra_options",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
