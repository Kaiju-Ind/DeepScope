import type { TechnologyDefinition } from '../../types';

export const conveadTechnologyDefinition = {
	id: "convead",
	name: "Convead",
	website: "https://convead.io",
	description: "Convead is a CRM marketing platform for ecommerce stores that helps collect data, segment customers, and automate marketing efforts.",
	icon: "Convead.svg",
	categories: [
		"marketing-automation",
		"business-tools",
	],
	rules: [
		{
			id: "convead:jsGlobal:0",
			kind: "jsGlobal",
			property: "ConveadSettings.app_key",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "convead:jsGlobal:1",
			kind: "jsGlobal",
			property: "convead",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
