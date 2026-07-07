import type { TechnologyDefinition } from '../../types';

export const shopaholicTechnologyDefinition = {
	id: "shopaholic",
	name: "Shopaholic",
	website: "https://shopaholic.one",
	description: "Shopaholic is an open-source ecosystem of plugins and themes for rapid ecommerce website development that allows building projects from small to large online shops.",
	icon: "Shopaholic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopaholic:dom:0",
			kind: "dom",
			selector: "[class*='_shopaholic']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "shopaholic:jsGlobal:1",
			kind: "jsGlobal",
			property: "ShopaholicCart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopaholic:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^shopaholic_cart_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"october-cms",
	],
} as const satisfies TechnologyDefinition;
