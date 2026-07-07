import type { TechnologyDefinition } from '../../types';

export const firstpromoterTechnologyDefinition = {
	id: "firstpromoter",
	name: "FirstPromoter",
	website: "https://firstpromoter.com",
	description: "FirstPromoter is a software platform that helps businesses to create, manage and track their affiliate marketing programs.",
	icon: "FirstPromoter.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "firstpromoter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.firstpromoter\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "firstpromoter:dom:1",
			kind: "dom",
			selector: "link[href*='//firstpromoter.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "firstpromoter:jsGlobal:2",
			kind: "jsGlobal",
			property: "FirstPromoterAPI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "firstpromoter:jsGlobal:3",
			kind: "jsGlobal",
			property: "fprom_obj_",
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
