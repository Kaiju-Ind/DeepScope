import type { TechnologyDefinition } from '../../types';

export const rainTechnologyDefinition = {
	id: "rain",
	name: "Rain",
	website: "https://www.rainpos.com",
	description: "Rain is a cloud-based point of sale (POS) system for small to midsized retailers.",
	icon: "Rain.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rain:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.rainpos\\.com\\/"),
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
