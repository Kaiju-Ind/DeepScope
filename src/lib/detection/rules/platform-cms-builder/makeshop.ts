import type { TechnologyDefinition } from '../../types';

export const makeshopTechnologyDefinition = {
	id: "makeshop",
	name: "MakeShop",
	website: "https://www.makeshop.jp",
	description: "MakeShop is a Japanese ecommerce platform.",
	icon: "MakeShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "makeshop:dom:0",
			kind: "dom",
			selector: "link[href*='gigaplus.makeshop.jp'], img[src*='gigaplus.makeshop.jp']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "makeshop:jsGlobal:1",
			kind: "jsGlobal",
			property: "MakeShop_TopSearch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "makeshop:jsGlobal:2",
			kind: "jsGlobal",
			property: "makeshop_ga_gtag",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
