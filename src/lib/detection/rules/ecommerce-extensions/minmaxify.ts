import type { TechnologyDefinition } from '../../types';

export const minmaxifyTechnologyDefinition = {
	id: "minmaxify",
	name: "MinMaxify",
	website: "https://apps.shopify.com/order-limits-minmaxify",
	description: "MinMaxify is an app that allows Shopify store owners to set minimum and maximum values for customer orders built by Intillium.",
	icon: "MinMaxify.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "minmaxify:jsGlobal:0",
			kind: "jsGlobal",
			property: "minMaxify.checkLimits",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "minmaxify:jsGlobal:1",
			kind: "jsGlobal",
			property: "minMaxify.shop",
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
