import type { TechnologyDefinition } from '../../types';

export const hyperspeedTechnologyDefinition = {
	id: "hyperspeed",
	name: "Hyperspeed",
	website: "https://www.hyperspeed.me",
	description: "Hyperspeed is the most advanced speed booster for Shopify.",
	icon: "Hyperspeed.png",
	categories: [
		"monitoring-error-tracking",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "hyperspeed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shopify\\.com\\/.+\\/assets\\/hs-(?:instantload|lazysizes)\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hyperspeed:jsGlobal:1",
			kind: "jsGlobal",
			property: "hyperscripts",
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
	implies: [
		"instant-page",
		"shopify",
	],
} as const satisfies TechnologyDefinition;
