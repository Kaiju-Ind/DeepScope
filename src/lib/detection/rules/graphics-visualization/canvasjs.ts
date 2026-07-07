import type { TechnologyDefinition } from '../../types';

export const canvasjsTechnologyDefinition = {
	id: "canvasjs",
	name: "CanvasJS",
	website: "https://canvasjs.com",
	description: "CanvasJS charts is a data visualisation library that runs across multiple devices and browsers.",
	icon: "canvasjs.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "canvasjs:jsGlobal:0",
			kind: "jsGlobal",
			property: "CanvasJS.Chart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "canvasjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "CanvasJS.Chart.version",
			valuePattern: new RegExp("^v(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
