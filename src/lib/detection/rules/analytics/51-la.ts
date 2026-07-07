import type { TechnologyDefinition } from '../../types';

export const technology51LaTechnologyDefinition = {
	id: "51-la",
	name: "51.LA",
	website: "https://www.51.la",
	description: "51.LA is a Chinese based website visitor counter.",
	icon: "51.LA.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "51-la:jsGlobal:0",
			kind: "jsGlobal",
			property: "LA.config.ck",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
