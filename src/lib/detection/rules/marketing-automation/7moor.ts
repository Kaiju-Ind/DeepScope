import type { TechnologyDefinition } from '../../types';

export const technology7moorTechnologyDefinition = {
	id: "7moor",
	name: "7moor",
	website: "https://www.7moor.com",
	description: "7moor is an integrated customer service marketing solution that combines communication, customer support, and marketing tools.",
	icon: "7moor.svg",
	categories: [
		"marketing-automation",
		"business-tools",
	],
	rules: [
		{
			id: "7moor:jsGlobal:0",
			kind: "jsGlobal",
			property: "moor7Source",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
