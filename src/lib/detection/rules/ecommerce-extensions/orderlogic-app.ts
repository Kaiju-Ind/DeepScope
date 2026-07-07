import type { TechnologyDefinition } from '../../types';

export const orderlogicAppTechnologyDefinition = {
	id: "orderlogic-app",
	name: "OrderLogic app",
	website: "https://apps.shopify.com/orderlogic",
	description: "OrderLogic app allows you to define minimum and maximum product quantities for all products in your Shopify store.",
	icon: "OrderLogic app.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "orderlogic-app:jsGlobal:0",
			kind: "jsGlobal",
			property: "OrderLogic.ALERTS_KEY",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "orderlogic-app:jsGlobal:1",
			kind: "jsGlobal",
			property: "OrderLogic.DEFAULT_MONEY_FORMAT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "orderlogic-app:jsGlobal:2",
			kind: "jsGlobal",
			property: "OrderLogic.cartData",
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
