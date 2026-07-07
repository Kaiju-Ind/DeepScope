import type { TechnologyDefinition } from '../../types';

export const transcendTechnologyDefinition = {
	id: "transcend",
	name: "Transcend",
	website: "https://www.transcend.io",
	description: "Transcend is data privacy management compliance platform.",
	icon: "Transcend.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "transcend:jsGlobal:0",
			kind: "jsGlobal",
			property: "transcend",
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
