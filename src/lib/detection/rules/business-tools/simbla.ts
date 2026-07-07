import type { TechnologyDefinition } from '../../types';

export const simblaTechnologyDefinition = {
	id: "simbla",
	name: "Simbla",
	website: "https://www.simbla.com",
	description: "Simbla is an AI-powered CRM platform.",
	icon: "Simbla.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "simbla:jsGlobal:0",
			kind: "jsGlobal",
			property: "Simbla",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "simbla:jsGlobal:1",
			kind: "jsGlobal",
			property: "createSimblaObj",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "simbla:jsGlobal:2",
			kind: "jsGlobal",
			property: "isSimblaObject",
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
