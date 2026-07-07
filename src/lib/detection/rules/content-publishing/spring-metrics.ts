import type { TechnologyDefinition } from '../../types';

export const springMetricsTechnologyDefinition = {
	id: "spring-metrics",
	name: "Spring Metrics",
	website: "https://springmetrics.com",
	description: "Spring Metrics is an online learning platform for management software in the hospitality industry.",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "spring-metrics:jsGlobal:0",
			kind: "jsGlobal",
			property: "_springMetq",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
