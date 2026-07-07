import type { TechnologyDefinition } from '../../types';

export const hireologyTechnologyDefinition = {
	id: "hireology",
	name: "Hireology",
	website: "https://hireology.com",
	description: "Hireology is a staffing and hiring platform for the franchise and retail-automotive industries.",
	icon: "Hireology.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "hireology:url:0",
			kind: "url",
			pattern: new RegExp("sites\\.hireology\\.com\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "hireology:dom:1",
			kind: "dom",
			selector: "a[href*='sites.hireology.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
