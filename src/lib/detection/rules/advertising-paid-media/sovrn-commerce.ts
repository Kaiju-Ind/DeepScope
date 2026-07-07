import type { TechnologyDefinition } from '../../types';

export const sovrnCommerceTechnologyDefinition = {
	id: "sovrn-commerce",
	name: "Sovrn//Commerce",
	website: "https://www.sovrn.com/publishers/commerce/",
	description: "Sovrn//Commerce is  a content monetization tool for publishers.",
	icon: "Sovrn.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "sovrn-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:^[^/]*\\/\\/[^/]*viglink\\.com\\/api\\/|vglnk\\.js)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sovrn-commerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "vglnk",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sovrn-commerce:jsGlobal:2",
			kind: "jsGlobal",
			property: "vl_cB",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sovrn-commerce:jsGlobal:3",
			kind: "jsGlobal",
			property: "vl_disable",
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
