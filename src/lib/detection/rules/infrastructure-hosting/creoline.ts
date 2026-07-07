import type { TechnologyDefinition } from '../../types';

export const creolineTechnologyDefinition = {
	id: "creoline",
	name: "Creoline",
	website: "https://www.creoline.com",
	description: "Creoline is a provider of scalable cloud solutions and application domain services.",
	icon: "Creoline.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "creoline:dom:0",
			kind: "dom",
			selector: "link[href*='.cstatic.io/']",
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
