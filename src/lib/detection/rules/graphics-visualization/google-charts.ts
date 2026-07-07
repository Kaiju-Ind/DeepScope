import type { TechnologyDefinition } from '../../types';

export const googleChartsTechnologyDefinition = {
	id: "google-charts",
	name: "Google Charts",
	website: "https://developers.google.com/chart/",
	description: "Google Charts is an interactive web service that creates graphical charts from user-supplied information.",
	icon: "Google Charts.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "google-charts:jsGlobal:0",
			kind: "jsGlobal",
			property: "__googleVisualizationAbstractRendererElementsCount__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-charts:jsGlobal:1",
			kind: "jsGlobal",
			property: "__gvizguard__",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
