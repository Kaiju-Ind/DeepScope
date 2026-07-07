import type { TechnologyDefinition } from '../../types';

export const shopifyGeolocationAppTechnologyDefinition = {
	id: "shopify-geolocation-app",
	name: "Shopify Geolocation App",
	website: "https://apps.shopify.com/geolocation",
	description: "Shopify Geolocation App makes language and country recommendations to your customers based on their geographic location and browser or device language.",
	icon: "Shopify Geolocation App.png",
	categories: [
		"ecommerce-extensions",
		"maps-location",
	],
	rules: [
		{
			id: "shopify-geolocation-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("geolocation-recommendations\\.shopifycloud\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
