import type { TechnologyDefinition } from '../../types';

export const flocktoryTechnologyDefinition = {
	id: "flocktory",
	name: "Flocktory",
	website: "https://www.flocktory.com",
	description: "Flocktory is a social referral marketing platform that enables users to share personalised offers via social networks.",
	icon: "Flocktory.png",
	categories: [
		"marketing-automation",
		"commerce-operations",
	],
	rules: [
		{
			id: "flocktory:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.flocktory\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flocktory:dom:1",
			kind: "dom",
			selector: "iframe[src*='.flocktory.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "flocktory:jsGlobal:2",
			kind: "jsGlobal",
			property: "flocktory",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flocktory:jsGlobal:3",
			kind: "jsGlobal",
			property: "flocktoryPurchase",
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
