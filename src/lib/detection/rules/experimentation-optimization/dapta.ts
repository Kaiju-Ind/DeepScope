import type { TechnologyDefinition } from '../../types';

export const daptaTechnologyDefinition = {
	id: "dapta",
	name: "Dapta",
	website: "https://dapta.ai",
	description: "Dapta is a real-time visitor segmentation and website personalization platform that uses AI to accelerate sales, marketing, and operations workflows for small and medium-sized businesses.",
	icon: "Dapta.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "dapta:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dapta\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dapta:jsGlobal:1",
			kind: "jsGlobal",
			property: "daptaAgent.agent_context",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dapta:jsGlobal:2",
			kind: "jsGlobal",
			property: "toggleDaptaWidgetChat",
			description: "Page-owned global matches a known technology marker.",
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
