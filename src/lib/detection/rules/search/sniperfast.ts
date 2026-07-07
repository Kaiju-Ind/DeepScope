import type { TechnologyDefinition } from '../../types';

export const sniperfastTechnologyDefinition = {
	id: "sniperfast",
	name: "SniperFast",
	website: "https://www.sniperfast.com",
	description: "SniperFast is instant search system for ecommerce sites.",
	icon: "SniperFast.png",
	categories: [
		"search",
	],
	rules: [
		{
			id: "sniperfast:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sniperfast\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sniperfast:jsGlobal:1",
			kind: "jsGlobal",
			property: "sniperEnableSearch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sniperfast:jsGlobal:2",
			kind: "jsGlobal",
			property: "sniper_search_key",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sniperfast:jsGlobal:3",
			kind: "jsGlobal",
			property: "sniperfast_page_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
