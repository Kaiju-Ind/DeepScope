import type { TechnologyDefinition } from '../../types';

export const colormeshopTechnologyDefinition = {
	id: "colormeshop",
	name: "ColorMeShop",
	website: "https://shop-pro.jp",
	description: "ColorMeShop is an ecommerce platform from Japan.",
	icon: "colormeshop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "colormeshop:jsGlobal:0",
			kind: "jsGlobal",
			property: "Colorme",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
