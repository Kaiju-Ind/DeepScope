import type { TechnologyDefinition } from '../../types';

export const trumbaTechnologyDefinition = {
	id: "trumba",
	name: "Trumba",
	website: "https://www.trumba.com",
	description: "Trumba offers web-hosted event calendar software for publishing online, interactive, calendars of events.",
	icon: "Trumba.png",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "trumba:dom:0",
			kind: "dom",
			selector: "a[href*='www.trumba.com/calendars/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "trumba:jsGlobal:1",
			kind: "jsGlobal",
			property: "$Trumba",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trumba:jsGlobal:2",
			kind: "jsGlobal",
			property: "$Trumba.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trumba:jsGlobal:3",
			kind: "jsGlobal",
			property: "Trumba",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
