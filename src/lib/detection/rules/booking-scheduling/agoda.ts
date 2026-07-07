import type { TechnologyDefinition } from '../../types';

export const agodaTechnologyDefinition = {
	id: "agoda",
	name: "Agoda",
	website: "https://www.agoda.com",
	description: "Agoda is an online travel platform offering its services globally via its app and website.",
	icon: "Agoda.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "agoda:dom:0",
			kind: "dom",
			selector: "link[href*='banner.agoda.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "agoda:jsGlobal:1",
			kind: "jsGlobal",
			property: "agoda",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "agoda:jsGlobal:2",
			kind: "jsGlobal",
			property: "agoda_ad_client",
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
