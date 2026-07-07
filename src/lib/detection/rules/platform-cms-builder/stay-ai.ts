import type { TechnologyDefinition } from '../../types';

export const stayAiTechnologyDefinition = {
	id: "stay-ai",
	name: "Stay AI",
	website: "https://stay.ai",
	description: "Stay AI is a subscription management tool designed for Shopify.",
	icon: "StayAI.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "stay-ai:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("Stay AI"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "stay-ai:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("stay ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
