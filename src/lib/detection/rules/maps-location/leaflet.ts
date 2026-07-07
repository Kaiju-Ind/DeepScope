import type { TechnologyDefinition } from '../../types';

export const leafletTechnologyDefinition = {
	id: "leaflet",
	name: "Leaflet",
	website: "https://leafletjs.com",
	description: "Leaflet is the open-source JavaScript library for mobile-friendly interactive maps.",
	icon: "Leaflet.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "leaflet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("leaflet.{0,32}\\.js(?!.+shopify)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "leaflet:jsGlobal:1",
			kind: "jsGlobal",
			property: "L.DistanceGrid",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leaflet:jsGlobal:2",
			kind: "jsGlobal",
			property: "L.PosAnimation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leaflet:jsGlobal:3",
			kind: "jsGlobal",
			property: "L.version",
			valuePattern: new RegExp("^(.+)$"),
			confidence: 0,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leaflet:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("(?:(?:dist\\/)?)?leaflet[\\w\\-\\.]{0,32}\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?(?!.+shopify)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "leaflet:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/(?:dist\\/)?)?leaflet[\\w\\-\\.]{0,32}\\.js(?!.+shopify)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "leaflet:dom:6",
			kind: "dom",
			selector: "link[href*='leaflet.css'], link[href*='leaflet.js'], script[src*='leaflet.js']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
