import type { TechnologyDefinition } from '../../types';

export const revieveTechnologyDefinition = {
	id: "revieve",
	name: "Revieve",
	website: "https://www.revieve.com",
	description: "Revieve is a technology company delivering consumer-centric personalised digital brand experiences powered by AI/AR.",
	icon: "Revieve.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "revieve:jsGlobal:0",
			kind: "jsGlobal",
			property: "Revieve.__esModule",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "revieve:jsGlobal:1",
			kind: "jsGlobal",
			property: "revieveConfig.onClickProduct",
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
