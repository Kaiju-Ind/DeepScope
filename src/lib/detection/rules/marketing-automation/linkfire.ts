import type { TechnologyDefinition } from '../../types';

export const linkfireTechnologyDefinition = {
	id: "linkfire",
	name: "Linkfire",
	website: "https://www.linkfire.com",
	description: "Linkfire is a smart links tool designed for music marketing.",
	icon: "Linkfire.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "linkfire:jsGlobal:0",
			kind: "jsGlobal",
			property: "linkfire.linkfireUrl",
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
