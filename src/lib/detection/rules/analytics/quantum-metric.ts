import type { TechnologyDefinition } from '../../types';

export const quantumMetricTechnologyDefinition = {
	id: "quantum-metric",
	name: "Quantum Metric",
	website: "https://www.quantummetric.com/",
	description: "Quantum Metric is a continuous product design platform that helps organizations build better products faster.",
	icon: "Quantummetric.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "quantum-metric:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.quantummetric\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
