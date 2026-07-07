import type { TechnologyDefinition } from '../../types';

export const sheMediaTechnologyDefinition = {
	id: "she-media",
	name: "SHE Media",
	website: "https://www.shemedia.com",
	description: "SHE Media is an ad network, which means that they basically serve as a coordinator between advertisers and publishers (bloggers).",
	icon: "SHE Media.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "she-media:jsGlobal:0",
			kind: "jsGlobal",
			property: "SheMedia",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "she-media:jsGlobal:1",
			kind: "jsGlobal",
			property: "blogherads.adq",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
