import type { TechnologyDefinition } from '../../types';

export const tablebookerTechnologyDefinition = {
	id: "tablebooker",
	name: "TableBooker",
	website: "https://www.tablebooker.com",
	description: "Tablebooker is an online reservation system for restaurants.",
	icon: "TableBooker.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "tablebooker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("reservations\\.tablebooker\\.\\w+\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tablebooker:dom:1",
			kind: "dom",
			selector: "iframe[src*='tablebooker'], iframe[src*='reservations.tablebooker']",
			description: "DOM contains a TableBooker reservation iframe.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
