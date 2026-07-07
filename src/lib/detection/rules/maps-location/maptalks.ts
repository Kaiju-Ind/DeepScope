import type { TechnologyDefinition } from '../../types';

export const maptalksTechnologyDefinition = {
	id: "maptalks",
	name: "Maptalks",
	website: "https://maptalks.org",
	description: "Maptalks is a light and plugable JavaScript library for integrated 2D/3D maps.",
	icon: "Maptalks.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "maptalks:dom:0",
			kind: "dom",
			selector: "div.maptalks-wrapper",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "maptalks:jsGlobal:1",
			kind: "jsGlobal",
			property: "map._eventMap",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "maptalks:jsGlobal:2",
			kind: "jsGlobal",
			property: "maptalks.GeoJSON",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
