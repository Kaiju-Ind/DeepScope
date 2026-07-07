import type { TechnologyDefinition } from '../../types';

export const easygiftTechnologyDefinition = {
	id: "easygift",
	name: "EasyGift",
	website: "https://apps.shopify.com/gifter-cart-auto-include",
	description: "EasyGift is a tool that automates the addition of free gifts or products to the cart based on custom rules, allowing for upsells, BOGO (Buy 1 Get 1) offers, and the creation of rules based on cart value or specific products, with the ability to schedule start times for offer activation.",
	icon: "EasyGift.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "easygift:jsGlobal:0",
			kind: "jsGlobal",
			property: "EasyGift.nonTargetingRules",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "easygift:jsGlobal:1",
			kind: "jsGlobal",
			property: "EasyGiftScriptLoaded",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
