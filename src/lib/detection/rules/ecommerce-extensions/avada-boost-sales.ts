import type { TechnologyDefinition } from '../../types';

export const avadaBoostSalesTechnologyDefinition = {
	id: "avada-boost-sales",
	name: "Avada Boost Sales",
	website: "https://apps.shopify.com/avada-boost-sales",
	description: "AVADA Boost Sales is an one-stop solution that is specially designed to increase your sales with countdown timer, trust badges, sales pop, sales boost and many more.",
	icon: "Avada.svg",
	categories: [
		"ecommerce-extensions",
		"widgets-misc",
	],
	rules: [
		{
			id: "avada-boost-sales:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("boostsales\\.apps\\.avada\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "avada-boost-sales:jsGlobal:1",
			kind: "jsGlobal",
			property: "AVADA_BS_LAST_UPDATE",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
