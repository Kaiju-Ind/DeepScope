import type { TechnologyDefinition } from '../../types';

export const bnovoTechnologyDefinition = {
	id: "bnovo",
	name: "Bnovo",
	website: "https://bnovo.ru",
	description: "Bnovo is a hotel industry management system.",
	icon: "Bnovo.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "bnovo:jsGlobal:0",
			kind: "jsGlobal",
			property: "Bnovo_Widget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bnovo:jsGlobal:1",
			kind: "jsGlobal",
			property: "_bnovo_widget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
