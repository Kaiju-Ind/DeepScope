import type { TechnologyDefinition } from '../../types';

export const platinmarketTechnologyDefinition = {
	id: "platinmarket",
	name: "PlatinMarket",
	website: "https://www.platinmarket.com",
	description: "PlatinMarket is an ecommerce platform that provides solutions for online businesses to create and manage their online stores.",
	icon: "PlatinMarket.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "platinmarket:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/platincdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "platinmarket:jsGlobal:1",
			kind: "jsGlobal",
			property: "PlatinMarket",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	requires: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
