import type { TechnologyDefinition } from '../../types';

export const afterbuyTechnologyDefinition = {
	id: "afterbuy",
	name: "AfterBuy",
	website: "https://www.afterbuy.de",
	description: "AfterBuy is a software company that specialises in ecommerce software for small to enterprise level businesses.",
	icon: "AfterBuy.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "afterbuy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.afterbuy\\.de\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "afterbuy:jsGlobal:1",
			kind: "jsGlobal",
			property: "AfterbuyString",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
