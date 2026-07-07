import type { TechnologyDefinition } from '../../types';

export const reserveInStoreTechnologyDefinition = {
	id: "reserve-in-store",
	name: "Reserve In-Store",
	website: "https://www.reserveinstore.com",
	description: "Reserve In-Store app will allow customers to reserve an item in your store online to come to pick it up or view the item before making the purchase.",
	icon: "Reserve In-Store.svg",
	categories: [
		"ecommerce-extensions",
		"booking-scheduling",
	],
	rules: [
		{
			id: "reserve-in-store:jsGlobal:0",
			kind: "jsGlobal",
			property: "reserveInStore.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "reserve-in-store:jsGlobal:1",
			kind: "jsGlobal",
			property: "reserveInStoreJsUrl",
			valuePattern: new RegExp("\\/reserveinstore\\.js.+\\.myshopify\\.com"),
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
