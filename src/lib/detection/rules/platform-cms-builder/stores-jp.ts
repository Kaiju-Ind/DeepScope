import type { TechnologyDefinition } from '../../types';

export const storesJpTechnologyDefinition = {
	id: "stores-jp",
	name: "stores.jp",
	website: "https://stores.jp/ec/",
	description: "stores.jp is an ecommerce platform which allows users to create their own ecommerce website.",
	icon: "stores.jp.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "stores-jp:jsGlobal:0",
			kind: "jsGlobal",
			property: "STORES_JP",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
	implies: [
		"mastercard",
		"visa",
	],
} as const satisfies TechnologyDefinition;
