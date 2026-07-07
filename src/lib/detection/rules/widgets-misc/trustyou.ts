import type { TechnologyDefinition } from '../../types';

export const trustyouTechnologyDefinition = {
	id: "trustyou",
	name: "TrustYou",
	website: "https://www.trustyou.com",
	description: "TrustYou is guest feedback and hotel reputation software company located in Germany.",
	icon: "TrustYou.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "trustyou:dom:0",
			kind: "dom",
			selector: "iframe[src*='api.trustyou.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
