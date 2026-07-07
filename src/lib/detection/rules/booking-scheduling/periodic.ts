import type { TechnologyDefinition } from '../../types';

export const periodicTechnologyDefinition = {
	id: "periodic",
	name: "Periodic",
	website: "https://periodic.is",
	description: "Periodic is a white-label scheduling system.",
	icon: "Periodic.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "periodic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/integrations\\/embed\\/periodic-embed-resize\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "periodic:dom:1",
			kind: "dom",
			selector: "#periodic-embedded-calendar-script, .periodic-embedded-calendar-window, .bookingmain__maincontent",
			description: "DOM selector matches a known technology marker.",
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
