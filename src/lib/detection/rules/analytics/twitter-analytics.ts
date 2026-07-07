import type { TechnologyDefinition } from '../../types';

export const twitterAnalyticsTechnologyDefinition = {
	id: "twitter-analytics",
	name: "Twitter Analytics",
	website: "https://analytics.twitter.com",
	description: "Twitter Analytics is a built-in data-tracking platform that shows you insights specific to your Twitter account and activity.",
	icon: "Twitter.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "twitter-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.twitter\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
