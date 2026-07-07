import type { TechnologyDefinition } from '../../types';

export const nortonShoppingGuaranteeTechnologyDefinition = {
	id: "norton-shopping-guarantee",
	name: "Norton Shopping Guarantee",
	website: "https://norton.buysafe.com",
	description: "Norton Shopping Guarantee offering a third-party shopping guarantee to customers provides added protection and validation that you are safe to buy from.",
	icon: "Norton Shopping Guarantee.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "norton-shopping-guarantee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("nsg\\.symantec\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "norton-shopping-guarantee:jsGlobal:1",
			kind: "jsGlobal",
			property: "DO_NORTON_SHOPPING",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
	implies: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
