import type { TechnologyDefinition } from '../../types';

export const citruslimeTechnologyDefinition = {
	id: "citruslime",
	name: "CitrusLime",
	website: "https://citruslime.com",
	description: "CitrusLime is an end-to-end cloud retail solution that supports inventory management, point-of-sale operations, and online store integration within a unified platform.",
	icon: "CitrusLime.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "citruslime:jsGlobal:0",
			kind: "jsGlobal",
			property: "CitrusLime.ExternalServiceApiCalls",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "citruslime:jsGlobal:1",
			kind: "jsGlobal",
			property: "CitrusOnLoadPrep",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
