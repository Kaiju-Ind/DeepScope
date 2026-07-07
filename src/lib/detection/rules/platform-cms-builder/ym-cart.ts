import type { TechnologyDefinition } from '../../types';

export const ymCartTechnologyDefinition = {
	id: "ym-cart",
	name: "YM Cart",
	website: "https://ymcart.com",
	description: "Ymcart is a cross-border ecommerce platform providing an one-stop SaaS system for building independent online stores, primarily supporting Chinese ecommerce sellers.",
	icon: "YMCart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ym-cart:jsGlobal:0",
			kind: "jsGlobal",
			property: "exec_ymcart_collect",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ym-cart:jsGlobal:1",
			kind: "jsGlobal",
			property: "ymcartDataLayer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
