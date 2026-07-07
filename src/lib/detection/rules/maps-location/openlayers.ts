import type { TechnologyDefinition } from '../../types';

export const openlayersTechnologyDefinition = {
	id: "openlayers",
	name: "OpenLayers",
	website: "https://openlayers.org",
	description: "OpenLayers is an open-source JavaScript library for displaying map data in web browser.",
	icon: "OpenLayers.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "openlayers:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("openlayers"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "openlayers:jsGlobal:1",
			kind: "jsGlobal",
			property: "OpenLayers.VERSION_NUMBER",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "openlayers:jsGlobal:2",
			kind: "jsGlobal",
			property: "ol.CanvasMap",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "openlayers:jsGlobal:3",
			kind: "jsGlobal",
			property: "ol.AssertionError",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
