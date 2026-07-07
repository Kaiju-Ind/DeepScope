import type { TechnologyDefinition } from '../../types';

export const pepperjamTechnologyDefinition = {
	id: "pepperjam",
	name: "Pepperjam",
	website: "https://www.pepperjam.com",
	description: "Pepperjam is an affiliate marketing solutions provider.",
	icon: "Pepperjam.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "pepperjam:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.pepperjam\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pepperjam:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pepperjam",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pepperjam:jsGlobal:2",
			kind: "jsGlobal",
			property: "PepperjamTracking",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
