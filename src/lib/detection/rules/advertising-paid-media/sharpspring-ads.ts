import type { TechnologyDefinition } from '../../types';

export const sharpspringAdsTechnologyDefinition = {
	id: "sharpspring-ads",
	name: "SharpSpring Ads",
	website: "https://sharpspring.com/ads",
	description: "SharpSpring Ads is an all-in-one retargeting platform.",
	icon: "SharpSpring.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "sharpspring-ads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.perfectaudience\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sharpspring-ads:jsGlobal:1",
			kind: "jsGlobal",
			property: "_pa",
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
