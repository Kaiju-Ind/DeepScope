import type { TechnologyDefinition } from '../../types';

export const kwaiPixelTechnologyDefinition = {
	id: "kwai-pixel",
	name: "Kwai pixel",
	website: "https://www.kwai.com",
	description: "Kwai is a social network for short videos and trends.",
	icon: "Kwai.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "kwai-pixel:jsGlobal:0",
			kind: "jsGlobal",
			property: "KwaiAnalyticsObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kwai-pixel:jsGlobal:1",
			kind: "jsGlobal",
			property: "kwaiq",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
