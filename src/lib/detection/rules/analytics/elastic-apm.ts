import type { TechnologyDefinition } from '../../types';

export const elasticApmTechnologyDefinition = {
	id: "elastic-apm",
	name: "Elastic APM",
	website: "https://www.elastic.co/apm",
	description: "Elastic APM offers free and open application performance monitoring.",
	icon: "ElasticAPM.png",
	categories: [
		"analytics",
		"developer-tooling",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "elastic-apm:jsGlobal:0",
			kind: "jsGlobal",
			property: "elasticApm",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"elasticsearch",
	],
} as const satisfies TechnologyDefinition;
