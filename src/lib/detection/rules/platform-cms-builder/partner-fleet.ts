import type { TechnologyDefinition } from '../../types';

export const partnerFleetTechnologyDefinition = {
	id: "partner-fleet",
	name: "Partner Fleet",
	website: "https://www.partnerfleet.io",
	description: "Partner Fleet is a platform that enables organizations to build app marketplaces within their websites or products in a short timeframe without requiring engineering resources.",
	icon: "PartnerFleet.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "partner-fleet:jsGlobal:0",
			kind: "jsGlobal",
			property: "promoted_partners",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "partner-fleet:jsGlobal:1",
			kind: "jsGlobal",
			property: "related_partners",
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
