import type { TechnologyDefinition } from '../../types';

export const cryoutCreationsBravadaTechnologyDefinition = {
	id: "cryout-creations-bravada",
	name: "Cryout Creations Bravada",
	website: "https://www.cryoutcreations.eu/wordpress-themes/bravada",
	description: "Bravada is an unparalleled fullscreen WordPress theme created by Cryout Creations.",
	icon: "Cryout Creations.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "cryout-creations-bravada:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/bravada(?:-plus)?\\/.+frontend\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cryout-creations-bravada:dom:1",
			kind: "dom",
			selector: "link#bravada-style-css, img[src*='/wp-content/themes/bravada/']",
			description: "DOM selector matches a known technology marker.",
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
