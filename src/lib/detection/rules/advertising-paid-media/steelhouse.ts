import type { TechnologyDefinition } from '../../types';

export const steelhouseTechnologyDefinition = {
	id: "steelhouse",
	name: "SteelHouse",
	website: "https://steelhouse.com",
	description: "SteelHouse is an advertising software company which provides services for brands, agencies, and direct marketers.",
	icon: "SteelHouse.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "steelhouse:scriptSrc:0",
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
