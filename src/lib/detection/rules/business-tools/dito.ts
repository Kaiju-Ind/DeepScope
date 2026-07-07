import type { TechnologyDefinition } from '../../types';

export const ditoTechnologyDefinition = {
	id: "dito",
	name: "Dito",
	website: "https://www.dito.com.br",
	description: "Dito is a tool that centralizes and manages the relationship between brands and their customers.",
	icon: "Dito.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "dito:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("storage\\.googleapis\\.com\\/dito\\/sdk\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dito:jsGlobal:1",
			kind: "jsGlobal",
			property: "dito.AppSettings",
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
