import type { TechnologyDefinition } from '../../types';

export const freshRelevanceTechnologyDefinition = {
	id: "fresh-relevance",
	name: "Fresh Relevance",
	website: "https://www.freshrelevance.com",
	description: "Fresh Relevance is a personalization platform designed to create cross-channel experiences, enabling businesses to deliver customized customer interactions.",
	icon: "FreshRelevance.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "fresh-relevance:dom:0",
			kind: "dom",
			selector: "link[href*='am.freshrelevance.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
