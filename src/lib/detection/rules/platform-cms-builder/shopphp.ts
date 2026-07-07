import type { TechnologyDefinition } from '../../types';

export const shopphpTechnologyDefinition = {
	id: "shopphp",
	name: "ShopPHP",
	website: "https://www.shopphp.net",
	description: "ShopPHP is a PHP-based ecommerce software designed to help businesses set up and manage online stores.",
	icon: "ShopPHP.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopphp:jsGlobal:0",
			kind: "jsGlobal",
			property: "shopPHPFiyatCarpan",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopphp:jsGlobal:1",
			kind: "jsGlobal",
			property: "updateShopPHPUrunFiyat",
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
		"php",
	],
} as const satisfies TechnologyDefinition;
