import type { TechnologyDefinition } from '../../types';

export const poperTechnologyDefinition = {
	id: "poper",
	name: "Poper",
	website: "https://www.poper.ai",
	description: "Poper is an AI-powered onsite engagement platform designed to enhance user interactions, increase retention, and improve conversion rates.",
	icon: "Poper.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "poper:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.poper\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "poper:jsGlobal:1",
			kind: "jsGlobal",
			property: "POPER_EXECUTED_STATE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "poper:jsGlobal:2",
			kind: "jsGlobal",
			property: "POPER_INSTANCES",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
