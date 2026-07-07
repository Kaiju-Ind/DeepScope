import type { TechnologyDefinition } from '../../types';

export const vizuryTechnologyDefinition = {
	id: "vizury",
	name: "Vizury",
	website: "https://www.vizury.com",
	description: "Vizury is an ecommerce marketing platform.",
	icon: "Vizury.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "vizury:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.vizury\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vizury:jsGlobal:1",
			kind: "jsGlobal",
			property: "safariVizury",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vizury:jsGlobal:2",
			kind: "jsGlobal",
			property: "vizury_data",
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
