import type { TechnologyDefinition } from '../../types';

export const resengoTechnologyDefinition = {
	id: "resengo",
	name: "Resengo",
	website: "https://wwc.resengo.com",
	description: "Resengo is a restaurant table booking widget.",
	icon: "Resengo.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "resengo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.resengo\\.\\w+"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "resengo:dom:1",
			kind: "dom",
			selector: "iframe[src*='resengo']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "resengo:jsGlobal:2",
			kind: "jsGlobal",
			property: "wpJsonpResengoReservationWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
