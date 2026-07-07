import type { TechnologyDefinition } from '../../types';

export const futyTechnologyDefinition = {
	id: "futy",
	name: "Futy",
	website: "https://www.futy.io",
	description: "Futy is a tool that helps convert website visitors into leads through a customer-friendly approach.",
	icon: "Futy.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "futy:jsGlobal:0",
			kind: "jsGlobal",
			property: "Futy.$axios",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
