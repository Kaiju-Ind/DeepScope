import type { TechnologyDefinition } from '../../types';

export const cventTechnologyDefinition = {
	id: "cvent",
	name: "Cvent",
	website: "https://www.cvent.com",
	description: "Cvent is an event management software that offers a platform for managing in-person, virtual, and hybrid events.",
	icon: "Cvent.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "cvent:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cvent-assets\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cvent:jsGlobal:1",
			kind: "jsGlobal",
			property: "CVENT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cvent:jsGlobal:2",
			kind: "jsGlobal",
			property: "CVENT.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cvent:jsGlobal:3",
			kind: "jsGlobal",
			property: "Cvent_findElement",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
