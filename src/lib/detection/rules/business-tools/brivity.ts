import type { TechnologyDefinition } from '../../types';

export const brivityTechnologyDefinition = {
	id: "brivity",
	name: "Brivity",
	website: "https://www.brivity.com",
	description: "Brivity is a real estate CRM and software platform that helps agents manage contacts, automate workflows, track transactions, and support business development and deal management.",
	icon: "Brivity.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "brivity:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn1\\.brivityidx\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "brivity:jsGlobal:1",
			kind: "jsGlobal",
			property: "getBrivityHomeMiddlewareBaseUrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
