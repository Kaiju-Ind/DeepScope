import type { TechnologyDefinition } from '../../types';

export const simpleAnalyticsTechnologyDefinition = {
	id: "simple-analytics",
	name: "Simple Analytics",
	website: "https://simpleanalytics.com",
	description: "Simple Analytics is a privacy-friendly Google Analytics alternative.",
	icon: "Simple Analytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "simple-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("simpleanalyticscdn\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "simple-analytics:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("simpleanalytics\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "simple-analytics:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("simpleanalytics\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "simple-analytics:jsGlobal:3",
			kind: "jsGlobal",
			property: "sa_event",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "simple-analytics:jsGlobal:4",
			kind: "jsGlobal",
			property: "sa_event_loaded",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "simple-analytics:jsGlobal:5",
			kind: "jsGlobal",
			property: "sa_loaded",
			confidence: 25,
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
