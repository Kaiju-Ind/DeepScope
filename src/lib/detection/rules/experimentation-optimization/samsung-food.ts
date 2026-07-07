import type { TechnologyDefinition } from '../../types';

export const samsungFoodTechnologyDefinition = {
	id: "samsung-food",
	name: "Samsung Food",
	website: "https://samsungfood.com",
	description: "Samsung Food is an all-in-one app for recipe saving, meal planning, grocery shopping, and recipe sharing.",
	icon: "SamsungFood.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "samsung-food:jsGlobal:0",
			kind: "jsGlobal",
			property: "WhiskLoading",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "samsung-food:jsGlobal:1",
			kind: "jsGlobal",
			property: "whisk-jsp.push",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "samsung-food:jsGlobal:2",
			kind: "jsGlobal",
			property: "whisk.analytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
