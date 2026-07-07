import type { TechnologyDefinition } from '../../types';

export const uplotTechnologyDefinition = {
	id: "uplot",
	name: "uPlot",
	website: "https://leeoniya.github.io/uPlot",
	description: "uPlot is a small, fast chart for time series, lines, areas, ohlc and bars.",
	icon: "uPlot.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "uplot:jsGlobal:0",
			kind: "jsGlobal",
			property: "uPlot",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
