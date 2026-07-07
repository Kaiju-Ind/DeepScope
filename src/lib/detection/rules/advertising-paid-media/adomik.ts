import type { TechnologyDefinition } from '../../types';

export const adomikTechnologyDefinition = {
	id: "adomik",
	name: "Adomik",
	website: "https://www.adomik.com",
	description: "Adomik is a tool that assists digital publishers in enhancing their programmatic and real-time bidding (RTB) yield management, functioning as a programmatic ad network.",
	icon: "Adomik.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adomik:jsGlobal:0",
			kind: "jsGlobal",
			property: "Adomik",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
