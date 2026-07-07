import type { TechnologyDefinition } from '../../types';

export const innovidAdvertisingMeasurementTechnologyDefinition = {
	id: "innovid-advertising-measurement",
	name: "Innovid Advertising Measurement",
	website: "https://www.innovid.com/solutions/advertising-measurement",
	description: "Innovid Advertising Measurement is a solution for assessing and analyzing the performance of advertising campaigns across different platforms and devices.",
	icon: "Innovid.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "innovid-advertising-measurement:dom:0",
			kind: "dom",
			selector: "link[href*='.tvsquared.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "innovid-advertising-measurement:jsGlobal:1",
			kind: "jsGlobal",
			property: "TV2Track",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "innovid-advertising-measurement:jsGlobal:2",
			kind: "jsGlobal",
			property: "_tvq",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
