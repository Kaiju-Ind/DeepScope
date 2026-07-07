import type { TechnologyDefinition } from '../../types';

export const measuredTechnologyDefinition = {
	id: "measured",
	name: "Measured",
	website: "https://www.measured.com",
	description: "Measured is an analytics platform to measure efficiency of marketing channels.",
	icon: "Measured.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "measured:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tag\\.measured\\.com"),
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
