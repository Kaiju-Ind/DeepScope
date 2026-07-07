import type { TechnologyDefinition } from '../../types';

export const olapicTechnologyDefinition = {
	id: "olapic",
	name: "Olapic",
	website: "https://www.olapic.com",
	description: "Olapic is a content marketing tool specifically focused on visual marketing content.",
	icon: "Olapic.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "olapic:jsGlobal:0",
			kind: "jsGlobal",
			property: "olapic",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "olapic:jsGlobal:1",
			kind: "jsGlobal",
			property: "olapic.version",
			valuePattern: new RegExp("^v([\\d\\.]+)$"),
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
			"high",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
