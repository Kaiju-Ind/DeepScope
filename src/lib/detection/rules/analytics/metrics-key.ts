import type { TechnologyDefinition } from '../../types';

export const metricsKeyTechnologyDefinition = {
	id: "metrics-key",
	name: "Metrics Key",
	website: "https://metricskey.net",
	description: "Metrics Key is software used for tracking performance in software development and search marketing campaigns.",
	icon: "MetricsKey.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "metrics-key:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/metricskey\\.net\\/track\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
