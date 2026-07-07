import type { TechnologyDefinition } from '../../types';

export const trendemonTechnologyDefinition = {
	id: "trendemon",
	name: "Trendemon",
	website: "https://trendemon.com",
	description: "Trendemon is a web personalization and account-based orchestration solution.",
	icon: "Trendemon.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "trendemon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.trendemon\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
