import type { TechnologyDefinition } from '../../types';

export const stonlyTechnologyDefinition = {
	id: "stonly",
	name: "Stonly",
	website: "https://stonly.com",
	description: "Stonly is a platform that enhances support efficiency by enabling customer self-service through personalized knowledge, AI-driven assistance, and process automation.",
	icon: "Stonly.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "stonly:jsGlobal:0",
			kind: "jsGlobal",
			property: "STONLY_WID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stonly:jsGlobal:1",
			kind: "jsGlobal",
			property: "StonlyWidget.queue",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stonly:jsGlobal:2",
			kind: "jsGlobal",
			property: "jsonpStonlyWidget",
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
