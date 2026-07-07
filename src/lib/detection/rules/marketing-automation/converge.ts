import type { TechnologyDefinition } from '../../types';

export const convergeTechnologyDefinition = {
	id: "converge",
	name: "Converge",
	website: "https://www.runconverge.com",
	description: "Converge is an all-in-one marketing measurement platform that consolidates performance data to provide insights across multiple channels.",
	icon: "Converge.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "converge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.runconverge\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
