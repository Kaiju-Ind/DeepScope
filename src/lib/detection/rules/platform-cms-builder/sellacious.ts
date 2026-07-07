import type { TechnologyDefinition } from '../../types';

export const sellaciousTechnologyDefinition = {
	id: "sellacious",
	name: "Sellacious",
	website: "https://www.sellacious.com",
	description: "Sellacious is an open-source ecommerce and marketplace platform for integrated POS and online stores.",
	icon: "Sellacious.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sellacious:dom:0",
			kind: "dom",
			selector: ".mod-sellacious-cart",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sellacious:jsGlobal:1",
			kind: "jsGlobal",
			property: "SellaciousViewCartAIO",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"joomla",
	],
} as const satisfies TechnologyDefinition;
