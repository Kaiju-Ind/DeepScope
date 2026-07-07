import type { TechnologyDefinition } from '../../types';

export const googleMapsTechnologyDefinition = {
	id: "google-maps",
	name: "Google Maps",
	website: "https://maps.google.com",
	description: "Google Maps is a web mapping service. It offers satellite imagery, aerial photography, street maps, 360° interactive panoramic views of streets, real-time traffic conditions, and route planning for traveling by foot, car, bicycle and air, or public transportation.",
	icon: "Google Maps.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "google-maps:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:maps\\.google\\.com\\/maps\\?file=api(?:&v=([\\d.]+))?|maps\\.google\\.com\\/maps\\/api\\/staticmap)"),
			version: {
				source: "match",
				template: "API v$1",
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-maps:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/maps\\.google(?:apis)?\\.com\\/maps\\/api\\/js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-maps:dom:2",
			kind: "dom",
			selector: "iframe[src*='google.com/maps']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "google-maps:jsGlobal:3",
			kind: "jsGlobal",
			property: "GoogleMap",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-maps:jsGlobal:4",
			kind: "jsGlobal",
			property: "googleMapsConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
