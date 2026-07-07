import type { TechnologyDefinition } from '../../types';

export const hrflowAiTechnologyDefinition = {
	id: "hrflow-ai",
	name: "HrFlow.ai",
	website: "https://hrflow.ai",
	description: "HrFlow.ai is an HR data automation API platform.",
	icon: "HrFlow.ai.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "hrflow-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hrflow\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
