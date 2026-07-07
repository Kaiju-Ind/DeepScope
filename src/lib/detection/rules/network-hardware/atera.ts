import type { TechnologyDefinition } from '../../types';

export const ateraTechnologyDefinition = {
	id: "atera",
	name: "Atera",
	website: "https://www.atera.com",
	description: "Atera is a software solution for RMM network discovery, PSA, and remote access.",
	icon: "Atera.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "atera:jsGlobal:0",
			kind: "jsGlobal",
			property: "ateraAnalyticsFirstLoad",
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
		cpe: "cpe:2.3:a:atera:atera:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
