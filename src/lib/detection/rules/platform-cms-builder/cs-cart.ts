import type { TechnologyDefinition } from '../../types';

export const csCartTechnologyDefinition = {
	id: "cs-cart",
	name: "CS Cart",
	website: "https://www.cs-cart.com",
	description: "CS Cart is a turnkey ecommerce shopping cart software solution.",
	icon: "CS Cart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cs-cart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("var\\/cache\\/misc\\/assets\\/js\\/tygh\\/scripts-(?:[\\d\\w]+)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cs-cart:dom:1",
			kind: "dom",
			selector: "a[href*='.cs-cart.com'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cs-cart:jsGlobal:2",
			kind: "jsGlobal",
			property: "fn_buy_together_apply_discount",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cs-cart:jsGlobal:3",
			kind: "jsGlobal",
			property: "fn_calculate_total_shipping",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cs-cart:jsGlobal:4",
			kind: "jsGlobal",
			property: "fn_compare_strings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"onetime",
		],
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
