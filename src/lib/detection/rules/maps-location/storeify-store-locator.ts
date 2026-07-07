import type { TechnologyDefinition } from '../../types';

export const storeifyStoreLocatorTechnologyDefinition = {
	id: "storeify-store-locator",
	name: "Storeify Store Locator",
	website: "https://storeify.app",
	description: "Storeify Store Locator is an app for Shopify that enables businesses to add a store locator feature to their online stores.",
	icon: "Storeify.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "storeify-store-locator:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.storeify\\.app"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "storeify-store-locator:jsGlobal:1",
			kind: "jsGlobal",
			property: "storeify_storelocator_form",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
