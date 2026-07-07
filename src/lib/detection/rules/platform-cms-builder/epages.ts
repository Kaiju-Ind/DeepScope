import type { TechnologyDefinition } from '../../types';

export const epagesTechnologyDefinition = {
	id: "epages",
	name: "ePages",
	website: "https://www.epages.com/",
	description: "ePages is a provider of cloud-based online shop solutions.",
	icon: "ePages.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "epages:jsGlobal:0",
			kind: "jsGlobal",
			property: "epages",
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
