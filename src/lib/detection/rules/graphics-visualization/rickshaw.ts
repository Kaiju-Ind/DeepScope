import type { TechnologyDefinition } from '../../types';

export const rickshawTechnologyDefinition = {
	id: "rickshaw",
	name: "Rickshaw",
	website: "https://code.shutterstock.com/rickshaw/",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "rickshaw:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("rickshaw(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rickshaw:jsGlobal:1",
			kind: "jsGlobal",
			property: "Rickshaw",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"d3",
	],
} as const satisfies TechnologyDefinition;
