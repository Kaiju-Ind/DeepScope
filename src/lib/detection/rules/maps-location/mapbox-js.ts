import type { TechnologyDefinition } from '../../types';

export const mapboxJsTechnologyDefinition = {
	id: "mapbox-js",
	name: "Mapbox.js",
	website: "https://github.com/mapbox/mapbox.js",
	description: "Mapbox.js is a JavaScript library provided by Mapbox for working with interactive maps and geospatial data.",
	icon: "Mapbox.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "mapbox-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.mapbox\\.com\\/mapbox\\.js\\/v([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mapbox-js:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("api\\.mapbox\\.com\\/mapbox\\.js\\/v([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "mapbox-js:dom:2",
			kind: "dom",
			selector: "link[href*='api.mapbox.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"leaflet",
	],
} as const satisfies TechnologyDefinition;
