import type { TechnologyDefinition } from '../../types';

export const depictTechnologyDefinition = {
	id: "depict",
	name: "Depict",
	website: "https://depict.ai",
	description: "Depict is an ecommerce personalisation solution for fashion.",
	icon: "Depict.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "depict:dom:0",
			kind: "dom",
			selector: "link[href*='.depict.ai/']",
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
