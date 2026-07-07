import type { TechnologyDefinition } from '../../types';

export const conektaTechnologyDefinition = {
	id: "conekta",
	name: "Conekta",
	website: "https://conekta.com",
	description: "Conekta is a Mexican payment platform.",
	icon: "Conekta.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "conekta:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("conektaapi\\/v([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "conekta:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.conekta\\.\\w+\\/js\\/(?:v([\\d.]+)|)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
