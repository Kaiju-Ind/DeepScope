import type { TechnologyDefinition } from '../../types';

export const mntnTechnologyDefinition = {
	id: "mntn",
	name: "MNTN",
	website: "https://mountain.com",
	description: "MNTN (formerly SteelHouse) is a marketing technology company that provides a platform for digital advertising, including tools for programmatic advertising, creative management, and campaign optimization.",
	icon: "mntn.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "mntn:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.steelhousemedia\\.com\\/(?:spx\\?dxver=([\\d.]+))?"),
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
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
