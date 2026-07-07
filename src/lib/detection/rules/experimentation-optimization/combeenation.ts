import type { TechnologyDefinition } from '../../types';

export const combeenationTechnologyDefinition = {
	id: "combeenation",
	name: "Combeenation",
	website: "https://www.combeenation.com",
	description: "Combeenation is a powerful cloud-based configurator platform.",
	icon: "Combeenation.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "combeenation:dom:0",
			kind: "dom",
			selector: "iframe[src*='portal.combeenation.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
