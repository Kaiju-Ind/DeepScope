import type { TechnologyDefinition } from '../../types';

export const spreadTechnologyDefinition = {
	id: "spread",
	name: "SPREAD",
	website: "https://www.spreadfamily.fr",
	description: "SPREAD is a platform offering tailored marketing campaigns designed to enhance ecommerce engagement and performance.",
	icon: "SPREAD.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "spread:jsGlobal:0",
			kind: "jsGlobal",
			property: "loadSpreadTracker",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
