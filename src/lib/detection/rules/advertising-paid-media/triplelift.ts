import type { TechnologyDefinition } from '../../types';

export const tripleliftTechnologyDefinition = {
	id: "triplelift",
	name: "TripleLift",
	website: "https://triplelift.com",
	description: "TripleLift is an advertising technology company providing native programmatic to buyers and sellers.",
	icon: "TripleLift.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "triplelift:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.3lift\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "triplelift:dom:1",
			kind: "dom",
			selector: "iframe[src*='.3lift.com']",
			description: "DOM selector matches a known technology marker.",
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
