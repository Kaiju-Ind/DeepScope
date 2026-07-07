import type { TechnologyDefinition } from '../../types';

export const resmioTechnologyDefinition = {
	id: "resmio",
	name: "Resmio",
	website: "https://www.resmio.com",
	description: "Resmio is a restaurant table booking widget.",
	icon: "Resmio.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "resmio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.resmio\\.\\w+\\/static\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "resmio:jsGlobal:1",
			kind: "jsGlobal",
			property: "ResmioButton",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
