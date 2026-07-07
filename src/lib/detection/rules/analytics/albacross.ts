import type { TechnologyDefinition } from '../../types';

export const albacrossTechnologyDefinition = {
	id: "albacross",
	name: "Albacross",
	website: "https://albacross.com",
	description: "Albacross is a lead generation and account intelligence platform. It helps marketing and sales teams identify their ideal customers visiting their website and gives them the insights they need to generate more qualified leads, make prospecting more efficient and close more deals.",
	icon: "Albacross.svg",
	categories: [
		"analytics",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "albacross:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.albacross\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "albacross:jsGlobal:1",
			kind: "jsGlobal",
			property: "_nQsv",
			valuePattern: new RegExp("^([\\d.])$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
