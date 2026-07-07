import type { TechnologyDefinition } from '../../types';

export const relaTechnologyDefinition = {
	id: "rela",
	name: "Rela",
	website: "https://www.relahq.com",
	description: "Rela is a set of property marketing tools for real estate professionals to enhance listings, attract potential buyers, and streamline the sales process.",
	icon: "Rela.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "rela:jsGlobal:0",
			kind: "jsGlobal",
			property: "relaAjaxLink",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rela:jsGlobal:1",
			kind: "jsGlobal",
			property: "relaAjaxPost",
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
