import type { TechnologyDefinition } from '../../types';

export const noshowTechnologyDefinition = {
	id: "noshow",
	name: "NoShow",
	website: "https://noshow.io",
	description: "NoShow is a software platform for managing restaurant reservations, enabling booking scheduling, table allocation, and customer reservation tracking.",
	icon: "NoShow.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "noshow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.noshow\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "noshow:jsGlobal:1",
			kind: "jsGlobal",
			property: "initNoShowBooking",
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
