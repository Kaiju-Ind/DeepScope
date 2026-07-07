import type { TechnologyDefinition } from '../../types';

export const buyselladsTechnologyDefinition = {
	id: "buysellads",
	name: "BuySellAds",
	website: "https://buysellads.com",
	description: "BuySellAds is a marketplace for advertising, newsletter sponsorships, and publisher monetization.",
	icon: "BuySellAds.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "buysellads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/s\\d\\.buysellads\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "buysellads:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("servedby-buysellads\\.com\\/monetization(?:\\.[\\w\\d]+)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "buysellads:jsGlobal:2",
			kind: "jsGlobal",
			property: "_bsa",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "buysellads:jsGlobal:3",
			kind: "jsGlobal",
			property: "_bsaPRO",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "buysellads:jsGlobal:4",
			kind: "jsGlobal",
			property: "_bsap",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "buysellads:jsGlobal:5",
			kind: "jsGlobal",
			property: "_bsap_serving_callback",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
