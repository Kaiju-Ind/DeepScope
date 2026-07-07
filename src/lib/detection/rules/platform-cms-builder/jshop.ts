import type { TechnologyDefinition } from '../../types';

export const jshopTechnologyDefinition = {
	id: "jshop",
	name: "JShop",
	website: "https://www.whorl.co.uk",
	description: "JShop is the ecommerce database solution marketed by Whorl Ltd. worldwide.",
	icon: "JShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "jshop:jsGlobal:0",
			kind: "jsGlobal",
			property: "jss_1stepDeliveryType",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jshop:jsGlobal:1",
			kind: "jsGlobal",
			property: "jss_1stepFillShipping",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
