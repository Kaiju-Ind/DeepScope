import type { TechnologyDefinition } from '../../types';

export const sabeeappTechnologyDefinition = {
	id: "sabeeapp",
	name: "SabeeApp",
	website: "https://www.sabeeapp.com",
	description: "SabeeApp is a property management system for hoteliers, managing reservations, controlling online distribution platforms, handling payments, and engaging with guests.",
	icon: "SabeeApp.svg",
	categories: [
		"business-tools",
		"booking-scheduling",
	],
	rules: [
		{
			id: "sabeeapp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ibe\\.sabeeapp\\.com\\/v(\\d+)\\/scripts"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sabeeapp:jsGlobal:1",
			kind: "jsGlobal",
			property: "webhome",
			valuePattern: new RegExp("ibe\\.sabeeapp\\.com"),
			description: "Page-owned global matches a known technology marker.",
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
