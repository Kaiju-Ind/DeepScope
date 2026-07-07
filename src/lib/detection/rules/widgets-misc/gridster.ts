import type { TechnologyDefinition } from '../../types';

export const gridsterTechnologyDefinition = {
	id: "gridster",
	name: "Gridster",
	website: "https://dsmorse.github.io/gridster.js",
	description: "Gridster is a jQuery plugin used to draw dashboards with drag-and-drop widgets.",
	categories: [
		"widgets-misc",
		"ui-library",
	],
	rules: [
		{
			id: "gridster:jsGlobal:0",
			kind: "jsGlobal",
			property: "Gridster",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gridster:jsGlobal:1",
			kind: "jsGlobal",
			property: "GridsterCollision",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gridster:jsGlobal:2",
			kind: "jsGlobal",
			property: "GridsterCoords",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gridster:jsGlobal:3",
			kind: "jsGlobal",
			property: "GridsterDraggable",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
	},
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
