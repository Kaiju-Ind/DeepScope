import type { TechnologyDefinition } from '../../types';

export const resonateTechnologyDefinition = {
	id: "resonate",
	name: "Resonate",
	website: "https://www.resonate.com",
	description: "Resonate is a consumer intelligence platform that collects, analyzes, and interprets audience data to provide insights into consumer behavior, preferences, and motivations for strategic decision-making.",
	icon: "Resonate.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "resonate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.resonate\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "resonate:jsGlobal:1",
			kind: "jsGlobal",
			property: "resonateAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
