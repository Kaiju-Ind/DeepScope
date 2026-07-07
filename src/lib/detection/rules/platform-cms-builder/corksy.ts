import type { TechnologyDefinition } from '../../types';

export const corksyTechnologyDefinition = {
	id: "corksy",
	name: "Corksy",
	website: "https://corksy.io",
	description: "Corksy is a solution for wineries, offering technology and services aimed at enhancing direct-to-consumer sales.",
	icon: "Corksy.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "corksy:jsGlobal:0",
			kind: "jsGlobal",
			property: "corksyPubSub",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
			"recurring",
		],
	},
	implies: [
		"duda",
	],
} as const satisfies TechnologyDefinition;
