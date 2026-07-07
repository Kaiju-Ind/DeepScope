import type { TechnologyDefinition } from '../../types';

export const kickflipTechnologyDefinition = {
	id: "kickflip",
	name: "Kickflip",
	website: "https://gokickflip.com",
	description: "Kickflip is a product customizer that enables visual customization of products on platforms like Shopify, WooCommerce, Wix, and via API integration.",
	icon: "Kickflip.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kickflip:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("gokickflip\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "kickflip:jsGlobal:1",
			kind: "jsGlobal",
			property: "kickflip.cart",
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
} as const satisfies TechnologyDefinition;
