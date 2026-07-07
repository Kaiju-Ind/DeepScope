import type { TechnologyDefinition } from '../../types';

export const plytixTechnologyDefinition = {
	id: "plytix",
	name: "Plytix",
	website: "https://www.plytix.com",
	description: "Plytix is an AI-powered product information management platform that provides tools for managing and organizing product content.",
	icon: "Plytix.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "plytix:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("analytics\\.plytix\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "plytix:jsGlobal:1",
			kind: "jsGlobal",
			property: "PlytixAnalyticsObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
