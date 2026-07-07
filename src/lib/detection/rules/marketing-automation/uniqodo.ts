import type { TechnologyDefinition } from '../../types';

export const uniqodoTechnologyDefinition = {
	id: "uniqodo",
	name: "Uniqodo",
	website: "https://www.uniqodo.com",
	description: "Uniqodo is a promotion engine that delivers engaging onsite experiences designed to support marketing campaigns and enhance user interaction across digital platforms.",
	icon: "Uniqodo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "uniqodo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("track\\.uniqodo\\.com\\/"),
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
