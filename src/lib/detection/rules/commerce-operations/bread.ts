import type { TechnologyDefinition } from '../../types';

export const breadTechnologyDefinition = {
	id: "bread",
	name: "Bread",
	website: "https://www.breadpayments.com",
	description: "Bread is a buy now, pay later platform for ecommerce websites.",
	icon: "Bread.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "bread:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getbread\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bread:dom:1",
			kind: "dom",
			selector: "#bread-mini-cart-btn",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bread:jsGlobal:2",
			kind: "jsGlobal",
			property: "BreadCalc",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bread:jsGlobal:3",
			kind: "jsGlobal",
			property: "BreadError",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bread:jsGlobal:4",
			kind: "jsGlobal",
			property: "BreadLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bread:jsGlobal:5",
			kind: "jsGlobal",
			property: "BreadShopify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bread:jsGlobal:6",
			kind: "jsGlobal",
			property: "bread.appHost",
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
