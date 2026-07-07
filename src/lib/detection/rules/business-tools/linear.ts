import type { TechnologyDefinition } from '../../types';

export const linearTechnologyDefinition = {
	id: "linear",
	name: "Linear",
	website: "https://linear.fi/hinnasto",
	description: "Linear is a platform for collecting payments and managing business operations, offering sales and marketing tools for real estate agents, extending beyond a traditional brokerage system.",
	icon: "Linear.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "linear:jsGlobal:0",
			kind: "jsGlobal",
			property: "linearFrontend",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
