import type { TechnologyDefinition } from '../../types';

export const wshopTechnologyDefinition = {
	id: "wshop",
	name: "WSHOP",
	website: "https://www.wshop.com",
	description: "WSHOP is a cloud ecommerce platform for managing online stores, transactions, and customer interactions.",
	icon: "WSHOP.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wshop:jsGlobal:0",
			kind: "jsGlobal",
			property: "wShop.$attrs",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
