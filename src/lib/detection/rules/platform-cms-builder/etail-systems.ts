import type { TechnologyDefinition } from '../../types';

export const etailSystemsTechnologyDefinition = {
	id: "etail-systems",
	name: "Etail Systems",
	website: "https://www.etailsystems.com",
	description: "Etail Systems is an all-in-one centralized platform to manage all of your ecommerce operations.",
	icon: "EtailSystems.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "etail-systems:jsGlobal:0",
			kind: "jsGlobal",
			property: "EtailAlert",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "etail-systems:jsGlobal:1",
			kind: "jsGlobal",
			property: "EtailEncodePersText",
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
