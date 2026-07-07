import type { TechnologyDefinition } from '../../types';

export const facebookAdsTechnologyDefinition = {
	id: "facebook-ads",
	name: "Facebook Ads",
	website: "https://www.facebook.com/business/ads",
	description: "Facebook Ads is an online advertising platform developed by Facebook.",
	icon: "Facebook.svg",
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
