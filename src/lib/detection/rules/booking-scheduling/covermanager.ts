import type { TechnologyDefinition } from '../../types';

export const covermanagerTechnologyDefinition = {
	id: "covermanager",
	name: "CoverManager",
	website: "https://www.covermanager.com",
	description: "CoverManager is a restaurant table booking widget.",
	icon: "CoverManager.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "covermanager:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.covermanager\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "covermanager:dom:1",
			kind: "dom",
			selector: "iframe[src*='.covermanager.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
