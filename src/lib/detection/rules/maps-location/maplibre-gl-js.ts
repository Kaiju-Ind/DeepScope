import type { TechnologyDefinition } from '../../types';

export const maplibreGlJsTechnologyDefinition = {
	id: "maplibre-gl-js",
	name: "MapLibre GL JS",
	website: "https://github.com/maplibre/maplibre-gl-js",
	description: "MapLibre GL JS is an open-source library for publishing maps on your websites.",
	icon: "MapLibre.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "maplibre-gl-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("maplibre-gl@([\\d\\.]+)\\/dist\\/maplibre-gl\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maplibre-gl-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "apex.libVersions.maplibre",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "maplibre-gl-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "maplibregl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "maplibre-gl-js:jsGlobal:3",
			kind: "jsGlobal",
			property: "rmap2.maplibreglCompare",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
