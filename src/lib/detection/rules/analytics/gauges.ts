import type { TechnologyDefinition } from '../../types';

export const gaugesTechnologyDefinition = {
	id: "gauges",
	name: "Gauges",
	website: "https://get.gaug.es",
	description: "Gauges is a real-time web analytics tool that provides live traffic updates and essential metrics for websites.",
	icon: "Gauges.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "gauges:jsGlobal:0",
			kind: "jsGlobal",
			property: "_gauges",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gauges:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_gauges_$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
