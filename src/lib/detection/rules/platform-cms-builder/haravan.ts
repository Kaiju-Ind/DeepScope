import type { TechnologyDefinition } from '../../types';

export const haravanTechnologyDefinition = {
	id: "haravan",
	name: "Haravan",
	website: "https://www.haravan.com",
	description: "Haravan is a multi-channel ecommerce services provider from Vietnam.",
	icon: "Haravan.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "haravan:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("haravan.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "haravan:jsGlobal:1",
			kind: "jsGlobal",
			property: "Haravan",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "haravan:jsGlobal:2",
			kind: "jsGlobal",
			property: "Haravan.shop",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "haravan:jsGlobal:3",
			kind: "jsGlobal",
			property: "HaravanAnalytics.meta",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "haravan:jsGlobal:4",
			kind: "jsGlobal",
			property: "hrvBeacon.host",
			valuePattern: new RegExp("stats\\.hstatic\\.net"),
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
	excludes: [
		"prestashop",
		"shopify",
	],
} as const satisfies TechnologyDefinition;
