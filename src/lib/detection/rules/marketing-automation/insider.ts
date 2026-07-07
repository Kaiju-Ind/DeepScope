import type { TechnologyDefinition } from '../../types';

export const insiderTechnologyDefinition = {
	id: "insider",
	name: "Insider",
	website: "https://useinsider.com",
	description: "Insider is the first integrated Growth Management Platform helping digital marketers drive growth across the funnel, from Acquisition to Activation, Retention, and Revenue from a unified platform powered by Artificial Intelligence and Machine Learning.",
	icon: "Insider.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "insider:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.useinsider\\.\\w+\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "insider:jsGlobal:1",
			kind: "jsGlobal",
			property: "Insider",
			confidence: 20,
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
