import type { TechnologyDefinition } from '../../types';

export const trovitTechnologyDefinition = {
	id: "trovit",
	name: "Trovit",
	website: "https://www.trovit.com",
	description: "Trovit is a platform that provides analytics on homes, cars, and jobs.",
	icon: "Trovit.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "trovit:jsGlobal:0",
			kind: "jsGlobal",
			property: "TrovitAnalyticsObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
