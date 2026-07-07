import type { TechnologyDefinition } from '../../types';

export const teechartTechnologyDefinition = {
	id: "teechart",
	name: "TeeChart",
	website: "http://216.92.101.67/product/html5",
	description: "TeeChart is a JavaScript charting library that plots graphs in compatible browsers using native JavaScript and the HTML5 Canvas element.",
	icon: "TeeChart.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "teechart:jsGlobal:0",
			kind: "jsGlobal",
			property: "Tee.Animation",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
