import type { TechnologyDefinition } from '../../types';

export const oneapmTechnologyDefinition = {
	id: "oneapm",
	name: "OneAPM",
	website: "https://www.oneapm.com",
	description: "OneAPM is a platform providing end-to-end application performance management solutions, including real-time monitoring, anomaly detection, and data analysis for optimizing IT operations.",
	icon: "OneAPM.png",
	categories: [
		"analytics",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "oneapm:jsGlobal:0",
			kind: "jsGlobal",
			property: "BWEUM",
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
