import type { TechnologyDefinition } from '../../types';

export const bittadsTechnologyDefinition = {
	id: "bittads",
	name: "BittAds",
	website: "https://bittads.com",
	icon: "BittAds.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "bittads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bittads\\.com\\/js\\/bitt\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bittads:jsGlobal:1",
			kind: "jsGlobal",
			property: "bitt",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
