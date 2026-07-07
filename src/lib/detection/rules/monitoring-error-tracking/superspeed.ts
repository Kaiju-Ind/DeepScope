import type { TechnologyDefinition } from '../../types';

export const superspeedTechnologyDefinition = {
	id: "superspeed",
	name: "Superspeed",
	website: "https://apps.shopify.com/superspeed-free-speed-boost",
	description: "Superspeed is a page speed optimizer app for Shopify based sites.",
	icon: "Superspeed.png",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "superspeed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("superspeed\\.gadget-edge\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
