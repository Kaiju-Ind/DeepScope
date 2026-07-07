import type { TechnologyDefinition } from '../../types';

export const loloyalTechnologyDefinition = {
	id: "loloyal",
	name: "Loloyal",
	website: "https://www.loloyal.com",
	description: "Loloyal is a loyalty and rewards program for Shopify that helps small businesses increase customer engagement and retention through user-friendly features.",
	icon: "Loloyal.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "loloyal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.loloyal\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "loloyal:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("static\\.loloyal\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "loloyal:jsGlobal:2",
			kind: "jsGlobal",
			property: "LOLOYAL_ONSITE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "loloyal:jsGlobal:3",
			kind: "jsGlobal",
			property: "LOLOYAL_ONSITE_ALL_LOCALE",
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
