import type { TechnologyDefinition } from '../../types';

export const tomisTechnologyDefinition = {
	id: "tomis",
	name: "Tomis",
	website: "https://tomis.tech",
	description: "Tomis is a digital marketing tour operator, specialising in promoting travel services through online channels.",
	icon: "Tomis.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "tomis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tomis-bot\\.firebaseapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tomis:dom:1",
			kind: "dom",
			selector: "script#tomis_script-js",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tomis:jsGlobal:2",
			kind: "jsGlobal",
			property: "TOMIS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
