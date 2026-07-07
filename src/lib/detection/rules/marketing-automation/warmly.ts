import type { TechnologyDefinition } from '../../types';

export const warmlyTechnologyDefinition = {
	id: "warmly",
	name: "Warmly",
	website: "https://www.warmly.ai",
	description: "Warmly is an AI-powered platform that helps generate prospect lists and automate the conversion process.",
	icon: "Warmly.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "warmly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("opps-widget\\.getwarmly\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "warmly:jsGlobal:1",
			kind: "jsGlobal",
			property: "warmly-widget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "warmly:jsGlobal:2",
			kind: "jsGlobal",
			property: "warmly-widget-config",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
