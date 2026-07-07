import type { TechnologyDefinition } from '../../types';

export const eztixTechnologyDefinition = {
	id: "eztix",
	name: "EzTix",
	website: "https://www.eztix.com",
	description: "EzTix is an event ticketing system.",
	icon: "EzTix.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "eztix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("kiosk\\.eztix\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "eztix:dom:1",
			kind: "dom",
			selector: "script#eztixKioskLinkId",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
