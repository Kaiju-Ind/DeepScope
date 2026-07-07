import type { TechnologyDefinition } from '../../types';

export const personioTechnologyDefinition = {
	id: "personio",
	name: "Personio",
	website: "https://www.personio.com",
	description: "Personio is the all-in-one HR software for small- and medium-sized companies with 10 to 2000 employees.",
	icon: "Personio.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "personio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cdn\\.personio\\."),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "personio:dom:1",
			kind: "dom",
			selector: "a[href*='.jobs.personio.']",
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
