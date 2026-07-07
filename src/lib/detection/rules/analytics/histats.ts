import type { TechnologyDefinition } from '../../types';

export const histatsTechnologyDefinition = {
	id: "histats",
	name: "Histats",
	website: "https://www.histats.com",
	description: "Histats is a simple website visitor analysis and tracking tool.",
	icon: "Histats.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "histats:dom:0",
			kind: "dom",
			selector: "img[src*='.histats.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "histats:jsGlobal:1",
			kind: "jsGlobal",
			property: "Histats.ver",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
