import type { TechnologyDefinition } from '../../types';

export const paradoxTechnologyDefinition = {
	id: "paradox",
	name: "Paradox",
	website: "https://www.paradox.ai",
	description: "Paradox is an AI company that helps companies capture and screen candidates, improve conversions, and answer all candidate questions.",
	icon: "Paradox.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "paradox:jsGlobal:0",
			kind: "jsGlobal",
			property: "_applybase",
			valuePattern: new RegExp("\\.paradox\\.ai"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paradox:jsGlobal:1",
			kind: "jsGlobal",
			property: "oliviaChatBaseUrl",
			valuePattern: new RegExp("\\.paradox\\.ai"),
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
