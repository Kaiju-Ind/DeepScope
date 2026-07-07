import type { TechnologyDefinition } from '../../types';

export const skyShopTechnologyDefinition = {
	id: "sky-shop",
	name: "Sky-Shop",
	website: "https://sky-shop.pl",
	description: "Sky-Shop.pl is a platform for dropshipping an online sales on Allegro, eBay and Amazon.",
	icon: "Sky-Shop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sky-shop:dom:0",
			kind: "dom",
			selector: ".skyshop-container",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sky-shop:jsGlobal:1",
			kind: "jsGlobal",
			property: "L.CONTINUE_SHOPPING",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sky-shop:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Sky-Shop", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sky-shop:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("sky-shop", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"bootstrap",
		"jquery",
		"php",
	],
} as const satisfies TechnologyDefinition;
