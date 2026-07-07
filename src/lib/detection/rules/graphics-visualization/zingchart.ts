import type { TechnologyDefinition } from '../../types';

export const zingchartTechnologyDefinition = {
	id: "zingchart",
	name: "ZingChart",
	website: "https://www.zingchart.com",
	description: "ZingChart is an open-source and free JavaScript library for building interactive and intuitive charts.",
	icon: "ZingChart.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "zingchart:jsGlobal:0",
			kind: "jsGlobal",
			property: "zingchart",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
