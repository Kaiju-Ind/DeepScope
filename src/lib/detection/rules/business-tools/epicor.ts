import type { TechnologyDefinition } from '../../types';

export const epicorTechnologyDefinition = {
	id: "epicor",
	name: "Epicor",
	website: "https://www.epicor.com",
	description: "Epicor is an enterprise resource planning software suite built to support manufacturing, distribution, retail, and service industries.",
	icon: "Epicor.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "epicor:jsGlobal:0",
			kind: "jsGlobal",
			property: "Epicor_Common",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "epicor:jsGlobal:1",
			kind: "jsGlobal",
			property: "Epicor_SalesrepPricing",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
