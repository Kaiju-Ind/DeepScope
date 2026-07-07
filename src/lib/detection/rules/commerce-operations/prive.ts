import type { TechnologyDefinition } from '../../types';

export const priveTechnologyDefinition = {
	id: "prive",
	name: "Prive",
	website: "https://www.tryprive.com",
	description: "Prive is a subscription service that enables users to register for multiple services.",
	icon: "Prive.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "prive:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tryprive\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prive:jsGlobal:1",
			kind: "jsGlobal",
			property: "PRIVE_SHOPPER_PORTAL_WIDGET",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prive:jsGlobal:2",
			kind: "jsGlobal",
			property: "PRIVE_WIDGET",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
