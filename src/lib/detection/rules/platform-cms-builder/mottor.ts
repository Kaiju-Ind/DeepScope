import type { TechnologyDefinition } from '../../types';

export const mottorTechnologyDefinition = {
	id: "mottor",
	name: "Mottor",
	website: "https://lpmotor.ru",
	description: "Mottor is a no-code tool for creating websites, online stores, landing pages, and more.",
	icon: "Mottor.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mottor:jsGlobal:0",
			kind: "jsGlobal",
			property: "mottorLogError",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mottor:jsGlobal:1",
			kind: "jsGlobal",
			property: "serviceBaseUrl",
			valuePattern: new RegExp("lpmotor\\.ru"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mottor:jsGlobal:2",
			kind: "jsGlobal",
			property: "serviceBaseUrl",
			valuePattern: new RegExp("\\lpmotor\\.ru"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
