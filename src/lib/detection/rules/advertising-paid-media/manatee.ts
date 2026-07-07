import type { TechnologyDefinition } from '../../types';

export const manateeTechnologyDefinition = {
	id: "manatee",
	name: "Manatee",
	website: "https://www.manatee.io",
	description: "Manatee is a tool designed to enhance online advertising revenue by optimising ad placements and targeting strategies, increasing click-through rates and overall ad performance.",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "manatee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.manatee\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "manatee:jsGlobal:1",
			kind: "jsGlobal",
			property: "adsbymanatee",
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
