import type { TechnologyDefinition } from '../../types';

export const decibelTechnologyDefinition = {
	id: "decibel",
	name: "Decibel",
	website: "https://decibel.com",
	description: "Decibel is a behavioral analysis solution that helps users gain actionable insights about their digital audience.",
	icon: "Decibel.svg",
	categories: [
		"analytics",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "decibel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.decibelinsight\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "decibel:jsGlobal:1",
			kind: "jsGlobal",
			property: "decibelInsight",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "decibel:jsGlobal:2",
			kind: "jsGlobal",
			property: "decibelInsightLayer",
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
