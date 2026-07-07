import type { TechnologyDefinition } from '../../types';

export const kwankoTechnologyDefinition = {
	id: "kwanko",
	name: "Kwanko",
	website: "https://www.kwanko.com",
	description: "Kwanko is a digital marketing platform.",
	icon: "Kwanko.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "kwanko:jsGlobal:0",
			kind: "jsGlobal",
			property: "kwankoDataPTAG.zone",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
