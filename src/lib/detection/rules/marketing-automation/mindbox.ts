import type { TechnologyDefinition } from '../../types';

export const mindboxTechnologyDefinition = {
	id: "mindbox",
	name: "Mindbox",
	website: "https://mindbox.ru",
	description: "Mindbox is a marketing automation platform.",
	icon: "Mindbox.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "mindbox:jsGlobal:0",
			kind: "jsGlobal",
			property: "MindboxEndpointSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mindbox:jsGlobal:1",
			kind: "jsGlobal",
			property: "mindbox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mindbox:jsGlobal:2",
			kind: "jsGlobal",
			property: "mindboxBatchedModulesInitialized",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
