import type { TechnologyDefinition } from '../../types';

export const addeventTechnologyDefinition = {
	id: "addevent",
	name: "AddEvent",
	website: "https://www.addevent.com",
	description: "AddEvent is used to Add to Calendar and event tools for websites and newsletters.",
	icon: "addevent.png",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "addevent:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/addevent\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "addevent:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/\\/|\\.)addevent\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "addevent:jsGlobal:2",
			kind: "jsGlobal",
			property: "addeventatc",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
