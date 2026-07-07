import type { TechnologyDefinition } from '../../types';

export const simplesatTechnologyDefinition = {
	id: "simplesat",
	name: "SimpleSat",
	website: "https://www.simplesat.io",
	description: "SimpleSat is a customer satisfaction survey tool designed for service businesses to collect feedback from their customers in an engaging manner.",
	icon: "SimpleSat.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "simplesat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.simplesat\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "simplesat:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.simplesat.io/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
