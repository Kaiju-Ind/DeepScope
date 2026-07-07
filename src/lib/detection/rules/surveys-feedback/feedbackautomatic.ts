import type { TechnologyDefinition } from '../../types';

export const feedbackautomaticTechnologyDefinition = {
	id: "feedbackautomatic",
	name: "FeedbackAutomatic",
	website: "https://feedbackautomatic.com",
	description: "FeedbackAutomatic is a platform that enables businesses to collect customer feedback through surveys, generating more online reviews to enhance their online reputation.",
	icon: "FeedbackAutomatic.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "feedbackautomatic:dom:0",
			kind: "dom",
			selector: "iframe[src*='app.feedbackautomatic.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
