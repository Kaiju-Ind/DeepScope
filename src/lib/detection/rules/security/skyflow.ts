import type { TechnologyDefinition } from '../../types';

export const skyflowTechnologyDefinition = {
	id: "skyflow",
	name: "Skyflow",
	website: "https://www.skyflow.com",
	description: "Skyflow is a company that provides a secure data privacy platform and API.",
	icon: "Skyflow.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "skyflow:jsGlobal:0",
			kind: "jsGlobal",
			property: "Skyflow.ElementType.CARD_NUMBER",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "skyflow:jsGlobal:1",
			kind: "jsGlobal",
			property: "Skyflow.ValidationRuleType",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
