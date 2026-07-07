import type { TechnologyDefinition } from '../../types';

export const cryoutCreationsFluidaTechnologyDefinition = {
	id: "cryout-creations-fluida",
	name: "Cryout Creations Fluida",
	website: "https://www.cryoutcreations.eu/wordpress-themes/fluida",
	description: "Fluida is a modern, crystal clear and squeaky clean WordPress theme by Cryout Creations.",
	icon: "Cryout Creations.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "cryout-creations-fluida:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/fluida(?:-plus)?\\/.+frontend\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cryout-creations-fluida:dom:1",
			kind: "dom",
			selector: "link#fluida-themefonts-css",
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
