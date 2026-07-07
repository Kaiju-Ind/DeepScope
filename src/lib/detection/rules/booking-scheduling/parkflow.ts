import type { TechnologyDefinition } from '../../types';

export const parkflowTechnologyDefinition = {
	id: "parkflow",
	name: "ParkFlow",
	website: "https://parkflow.io",
	description: "ParkFlow is a system for managing bookings at airport parking facilities, enabling streamlined scheduling, allocation, and tracking of parking reservations.",
	icon: "ParkFlow.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "parkflow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.parkflow\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
