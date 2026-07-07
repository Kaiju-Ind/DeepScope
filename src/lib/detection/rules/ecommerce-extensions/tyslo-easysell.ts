import type { TechnologyDefinition } from '../../types';

export const tysloEasysellTechnologyDefinition = {
	id: "tyslo-easysell",
	name: "Tyslo EasySell",
	website: "https://tyslo.com",
	description: "Tyslo EasySell replaces default Shopify checkout process by embedding (or popup) a simple order form on the product or cart page.",
	icon: "Tyslo EasySell.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "tyslo-easysell:jsGlobal:0",
			kind: "jsGlobal",
			property: "openTysloForm",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tyslo-easysell:jsGlobal:1",
			kind: "jsGlobal",
			property: "tysloApplyDiscount",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tyslo-easysell:jsGlobal:2",
			kind: "jsGlobal",
			property: "tysloConfigVersion",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tyslo-easysell:jsGlobal:3",
			kind: "jsGlobal",
			property: "tysloEasysellConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
