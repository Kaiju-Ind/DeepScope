import type { TechnologyDefinition } from '../../types';

export const googleAdsTechnologyDefinition = {
	id: "google-ads",
	name: "Google Ads",
	website: "https://ads.google.com",
	description: "Google Ads is an online advertising platform developed by Google.",
	icon: "Google Ads.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
