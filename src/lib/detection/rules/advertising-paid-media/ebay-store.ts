import type { TechnologyDefinition } from '../../types';

export const ebayStoreTechnologyDefinition = {
	id: "ebay-store",
	name: "eBay Store",
	website: "https://www.ebay.com",
	description: "eBay is a platform that either redirects users to eBay or displays a link to an eBay store.",
	icon: "eBay.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "ebay-store:jsGlobal:0",
			kind: "jsGlobal",
			property: "$ebay.tracking",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ebay-store:jsGlobal:1",
			kind: "jsGlobal",
			property: "ebay.gadgetMonitoring",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ebay-store:header:2",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^ebay server$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ebay-store:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^ebay server$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
