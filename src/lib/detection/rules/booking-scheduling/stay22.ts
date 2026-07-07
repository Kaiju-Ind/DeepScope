import type { TechnologyDefinition } from '../../types';

export const stay22TechnologyDefinition = {
	id: "stay22",
	name: "Stay22",
	website: "https://www.stay22.com",
	description: "Stay22 is a travel tech company that offers affiliate revenue generation opportunities for events, ticketing and travel media publications.",
	icon: "Stay22.svg",
	categories: [
		"booking-scheduling",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "stay22:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.stay22\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "stay22:jsGlobal:1",
			kind: "jsGlobal",
			property: "Stay22.version",
			valuePattern: new RegExp("([\\d\\.]+)$"),
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
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
