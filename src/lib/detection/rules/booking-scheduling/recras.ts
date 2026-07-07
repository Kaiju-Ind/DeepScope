import type { TechnologyDefinition } from '../../types';

export const recrasTechnologyDefinition = {
	id: "recras",
	name: "Recras",
	website: "https://www.recras.com",
	description: "Recras is a Dutch-based booking engine that manages reservations, schedules, and operational data for service providers.",
	icon: "Recras.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "recras:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.recras\\.nl\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "recras:jsGlobal:1",
			kind: "jsGlobal",
			property: "RecrasBooking",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "recras:jsGlobal:2",
			kind: "jsGlobal",
			property: "submitRecrasForm",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
