import type { TechnologyDefinition } from '../../types';

export const siteimproveTechnologyDefinition = {
	id: "siteimprove",
	name: "Siteimprove",
	website: "https://www.siteimprove.com",
	description: "Siteimprove is a digital analytics and content QA platform.",
	icon: "Siteimprove.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "siteimprove:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\.|\\/\\/)siteimprove(?:analytics)?\\.com\\/js\\/siteanalyze"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "siteimprove:jsGlobal:1",
			kind: "jsGlobal",
			property: "_sz.analytics.heatmap",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
