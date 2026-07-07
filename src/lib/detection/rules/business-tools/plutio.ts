import type { TechnologyDefinition } from '../../types';

export const plutioTechnologyDefinition = {
	id: "plutio",
	name: "Plutio",
	website: "https://www.plutio.com",
	description: "Plutio is an all-in-one platform for business management, team collaboration, and client interaction.",
	icon: "Plutio.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "plutio:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.plutio.com/']",
			description: "DOM selector matches a known technology marker.",
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
