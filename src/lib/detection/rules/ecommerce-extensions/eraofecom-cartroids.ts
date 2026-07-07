import type { TechnologyDefinition } from '../../types';

export const eraofecomCartroidsTechnologyDefinition = {
	id: "eraofecom-cartroids",
	name: "EraofEcom Cartroids",
	website: "https://eraofecom.org/collections/tech/products/cartroids",
	description: "EraofEcom Cartroids makes it easy for you to create highly targeted upsells, cross-sells and bundle offers.",
	icon: "EraofEcom.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "eraofecom-cartroids:jsGlobal:0",
			kind: "jsGlobal",
			property: "cartroids.appBase",
			valuePattern: new RegExp("cartroids\\.eraofecom\\.org"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
