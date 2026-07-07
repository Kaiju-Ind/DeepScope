import type { TechnologyDefinition } from '../../types';

export const a2zEventsTechnologyDefinition = {
	id: "a2z-events",
	name: "A2Z Events",
	website: "https://mya2zevents.com",
	description: "A2Z Events is an event management solution designed by and for event professionals.",
	icon: "A2ZEvents.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "a2z-events:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.a2zinc\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "a2z-events:jsGlobal:1",
			kind: "jsGlobal",
			property: "a2z.Widget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "a2z-events:jsGlobal:2",
			kind: "jsGlobal",
			property: "a2zAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
