import type { TechnologyDefinition } from '../../types';

export const misoTechnologyDefinition = {
	id: "miso",
	name: "Miso",
	website: "https://miso.ai",
	description: "Miso is a real-time personalisation APIs for search, recommendation, and marketing.",
	icon: "Miso.svg",
	categories: [
		"search",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "miso:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.askmiso\\.com\\/"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
