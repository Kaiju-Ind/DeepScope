import type { TechnologyDefinition } from '../../types';

export const thankyouAnalyticsTechnologyDefinition = {
	id: "thankyou-analytics",
	name: "ThankYou Analytics",
	website: "https://thankyouanalytics.com",
	description: "ThankYou Analytics is an analytics platform for marketing teams that provides data analysis and performance insights.",
	icon: "ThankYouAnalytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "thankyou-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("data\\.thank-you\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
