import type { TechnologyDefinition } from '../../types';

export const thesisTechnologyDefinition = {
	id: "thesis",
	name: "Thesis",
	website: "https://www.thesistesting.com",
	description: "Thesis is a conversion rate optimisation company.",
	icon: "Thesis.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "thesis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("thix\\.ttsep\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "thesis:jsGlobal:1",
			kind: "jsGlobal",
			property: "thix.history",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "thesis:jsGlobal:2",
			kind: "jsGlobal",
			property: "thix.t",
			confidence: 50,
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
