import type { TechnologyDefinition } from '../../types';

export const eraofecomWinadsTechnologyDefinition = {
	id: "eraofecom-winads",
	name: "EraofEcom WinAds",
	website: "https://eraofecom.org/collections/tech/products/win-ads-manager",
	description: "EraofEcom WinAds is an all-in-one Facebook pixel app for Shopify.",
	icon: "EraofEcom.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "eraofecom-winads:dom:0",
			kind: "dom",
			selector: "link[href*='winads.eraofecom.org']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "eraofecom-winads:jsGlobal:1",
			kind: "jsGlobal",
			property: "win_ads.baseURL",
			valuePattern: new RegExp("winads\\.eraofecom\\.org"),
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
		"shopify",
	],
} as const satisfies TechnologyDefinition;
