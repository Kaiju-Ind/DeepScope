import type { TechnologyDefinition } from '../../types';

export const ventrataTechnologyDefinition = {
	id: "ventrata",
	name: "Ventrata",
	website: "https://ventrata.com",
	description: "Ventrata is a booking platform designed for high volume tours and attractions, offering all-in-one ticketing systems.",
	icon: "Ventrata.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "ventrata:dom:0",
			kind: "dom",
			selector: "script#ventratajs-js",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ventrata:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ventrata.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
