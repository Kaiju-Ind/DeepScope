import type { TechnologyDefinition } from '../../types';

export const chargebeeTechnologyDefinition = {
	id: "chargebee",
	name: "Chargebee",
	website: "https://www.chargebee.com",
	description: "Chargebee is a PCI Level 1 certified recurring billing platform for SaaS and subscription-based businesses.",
	icon: "Chargebee.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "chargebee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.chargebee\\.com\\/v([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chargebee:jsGlobal:1",
			kind: "jsGlobal",
			property: "Chargebee",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chargebee:jsGlobal:2",
			kind: "jsGlobal",
			property: "chargebeeTrackFunc",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
