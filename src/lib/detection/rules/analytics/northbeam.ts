import type { TechnologyDefinition } from '../../types';

export const northbeamTechnologyDefinition = {
	id: "northbeam",
	name: "Northbeam",
	website: "https://www.northbeam.io",
	description: "Northbeam is a platform for marketing measurement that uses machine learning for DTC and ecommerce brands.",
	icon: "Northbeam.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "northbeam:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.northbeam\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "northbeam:dom:1",
			kind: "dom",
			selector: "script[data-src*='.northbeam.io/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
