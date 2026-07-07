import type { TechnologyDefinition } from '../../types';

export const appointoTechnologyDefinition = {
	id: "appointo",
	name: "Appointo",
	website: "https://www.sidepanda.com/appointo",
	description: "Appointo is a Shopify based booking engine from Sidepanda.",
	icon: "Appointo.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "appointo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/appointo-14\\/assets\\/appointo_bundle.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "appointo:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.appointo\\.me"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "appointo:jsGlobal:2",
			kind: "jsGlobal",
			property: "onRefreshAppointoWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
