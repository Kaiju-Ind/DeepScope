import type { TechnologyDefinition } from '../../types';

export const intelligemsTechnologyDefinition = {
	id: "intelligems",
	name: "Intelligems",
	website: "https://intelligems.io",
	description: "Intelligems is a tool that facilitates profit optimization for ecommerce businesses by allowing easy testing of prices, discounts, and shipping rates with the aim of maximizing margins.",
	icon: "Intelligems.svg",
	categories: [
		"experimentation-optimization",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "intelligems:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.intelligems\\.io\\/[\\w]+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "intelligems:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunk_intelligems_shopify_plugin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "intelligems:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.intelligems\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "intelligems:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^ig\\-location$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
