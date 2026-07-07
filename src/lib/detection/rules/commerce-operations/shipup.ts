import type { TechnologyDefinition } from '../../types';

export const shipupTechnologyDefinition = {
	id: "shipup",
	name: "Shipup",
	website: "https://www.shipup.co",
	description: "Shipup is a system that enables users to track shipping packages, providing real-time updates on delivery status and location.",
	icon: "Shipup.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "shipup:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.shipup\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shipup:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("shipup\\.co"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "shipup:jsGlobal:2",
			kind: "jsGlobal",
			property: "ShipupETA",
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
