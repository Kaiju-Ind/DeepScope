import type { TechnologyDefinition } from '../../types';

export const prodpadTechnologyDefinition = {
	id: "prodpad",
	name: "ProdPad",
	website: "https://www.prodpad.com",
	description: "ProdPad is a product management software platform enabling teams to gather ideas, set priorities, and create adaptable product roadmaps.",
	icon: "ProdPad.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "prodpad:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.prodpad\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
