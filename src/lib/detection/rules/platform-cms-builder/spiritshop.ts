import type { TechnologyDefinition } from '../../types';

export const spiritshopTechnologyDefinition = {
	id: "spiritshop",
	name: "SpiritShop",
	website: "https://spiritshop.com.br",
	description: "SpiritShop is an ecommerce plataform.",
	icon: "SpiritShop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "spiritshop:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^SPIRITSHOP_ID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "spiritshop:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^spiritshop_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
