import type { TechnologyDefinition } from '../../types';

export const mapboxGlJsTechnologyDefinition = {
	id: "mapbox-gl-js",
	name: "Mapbox GL JS",
	website: "https://github.com/mapbox/mapbox-gl-js",
	description: "Mapbox GL JS is a JavaScript library that uses WebGL to render interactive maps from vector tiles and Mapbox styles.",
	icon: "Mapbox.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "mapbox-gl-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mapbox-gl\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mapbox-gl-js:dom:1",
			kind: "dom",
			selector: "link[href*='mapbox-gl.css'], div.mapboxgl-map",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mapbox-gl-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "mapboxgl.version",
			valuePattern: new RegExp("^(.+)$"),
			confidence: 0,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mapbox-gl-js:dom:3",
			kind: "dom",
			selector: "link[href*='mapbox-gl.css'], div.mapboxgl-map, div.mapboxgl-canvas-container, canvas.mapboxgl-canvas",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
