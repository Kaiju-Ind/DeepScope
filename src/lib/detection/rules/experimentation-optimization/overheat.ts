import type { TechnologyDefinition } from '../../types';

export const overheatTechnologyDefinition = {
	id: "overheat",
	name: "Overheat",
	website: "https://overheat.it",
	description: "Overheat is a conversion optimization package designed to improve website performance by enhancing user experience and increasing conversion rates through data-driven strategies and tailored solutions.",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "overheat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.overheat\\.it"),
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
