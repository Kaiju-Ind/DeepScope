import type { TechnologyDefinition } from '../../types';

export const thoughtmetricTechnologyDefinition = {
	id: "thoughtmetric",
	name: "ThoughtMetric",
	website: "https://thoughtmetric.io",
	description: "ThoughtMetric is a marketing attribution platform for ecommerce.",
	icon: "ThoughtMetric.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "thoughtmetric:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.thoughtmetric\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
