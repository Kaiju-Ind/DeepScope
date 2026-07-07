import type { TechnologyDefinition } from '../../types';

export const leafletPlatformTechnologyDefinition = {
	id: "leaflet-platform",
	name: "Leaflet platform",
	website: "https://join.leaflet.co",
	description: "Leaflet is the price testing platform for Shopify.",
	icon: "Leaflet platform.png",
	categories: [
		"maps-location",
		"ecommerce-extensions",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "leaflet-platform:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\.leaflet\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
