import type { TechnologyDefinition } from '../../types';

export const returngoTechnologyDefinition = {
	id: "returngo",
	name: "ReturnGO",
	website: "https://returngo.ai",
	description: "ReturnGO's AI-driven returns management platform significantly improves customer lifetime value and post-purchase experience.",
	icon: "ReturnGO.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "returngo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.returngo\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "returngo:jsGlobal:1",
			kind: "jsGlobal",
			property: "returnGoCanBeRun",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "returngo:jsGlobal:2",
			kind: "jsGlobal",
			property: "returnGoIntegrationData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
