import type { TechnologyDefinition } from '../../types';

export const shopgoldTechnologyDefinition = {
	id: "shopgold",
	name: "ShopGold",
	website: "https://www.shopgold.pl",
	description: "ShopGold is an all-in-one payment processing and ecommerce solution.",
	icon: "ShopGold.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopgold:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^eGold$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "shopgold:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^popup_shopGold$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "shopgold:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^popup_shopGold_time$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "shopgold:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^egold$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "shopgold:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^popup_shopgold$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "shopgold:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^popup_shopgold_time$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
