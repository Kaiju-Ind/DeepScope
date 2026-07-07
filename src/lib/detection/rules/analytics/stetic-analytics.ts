import type { TechnologyDefinition } from '../../types';

export const steticAnalyticsTechnologyDefinition = {
	id: "stetic-analytics",
	name: "Stetic Analytics",
	website: "https://www.stetic.com",
	description: "Stetic Analytics is a platform that consolidates data tracking, reporting, and insights into a single system.",
	icon: "Stetic.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "stetic-analytics:jsGlobal:0",
			kind: "jsGlobal",
			property: "stetic.track",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
