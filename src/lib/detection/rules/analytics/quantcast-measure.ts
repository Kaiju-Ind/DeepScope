import type { TechnologyDefinition } from '../../types';

export const quantcastMeasureTechnologyDefinition = {
	id: "quantcast-measure",
	name: "Quantcast Measure",
	website: "https://www.quantcast.com/products/measure-audience-insights",
	description: "Quantcast Measure is an audience insights and analytics tool.",
	icon: "Quantcast.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "quantcast-measure:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.quantserve\\.com\\/quant\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "quantcast-measure:dom:1",
			kind: "dom",
			selector: "link[href*='.quantserve.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "quantcast-measure:jsGlobal:2",
			kind: "jsGlobal",
			property: "quantserve",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
