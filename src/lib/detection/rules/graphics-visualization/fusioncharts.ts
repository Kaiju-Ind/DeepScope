import type { TechnologyDefinition } from '../../types';

export const fusionchartsTechnologyDefinition = {
	id: "fusioncharts",
	name: "FusionCharts",
	website: "https://www.fusioncharts.com/charts",
	description: "FusionCharts is a comprehensive charting solution for websites.",
	icon: "fusion_charts.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "fusioncharts:jsGlobal:0",
			kind: "jsGlobal",
			property: "FusionCharts",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fusioncharts:jsGlobal:1",
			kind: "jsGlobal",
			property: "FusionChartsDataFormats",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fusioncharts:jsGlobal:2",
			kind: "jsGlobal",
			property: "FusionMaps",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
