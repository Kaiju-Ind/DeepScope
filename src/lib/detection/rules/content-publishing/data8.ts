import type { TechnologyDefinition } from '../../types';

export const data8TechnologyDefinition = {
	id: "data8",
	name: "Data8",
	website: "https://www.data-8.co.uk",
	description: "Data8 is a data quality management and validation platform.",
	icon: "Data8.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "data8:jsGlobal:0",
			kind: "jsGlobal",
			property: "data8",
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
