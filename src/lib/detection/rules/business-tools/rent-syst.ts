import type { TechnologyDefinition } from '../../types';

export const rentSystTechnologyDefinition = {
	id: "rent-syst",
	name: "Rent Syst",
	website: "https://rentsyst.com",
	description: "Rent Syst is a CRM system designed to manage customer relationships, bookings, and communication for car rental businesses.",
	icon: "RentSyst.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "rent-syst:jsGlobal:0",
			kind: "jsGlobal",
			property: "RentsystFrame",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rent-syst:jsGlobal:1",
			kind: "jsGlobal",
			property: "Rentsyst_Activate",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
