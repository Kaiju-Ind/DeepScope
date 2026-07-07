import type { TechnologyDefinition } from '../../types';

export const twitterAdsTechnologyDefinition = {
	id: "twitter-ads",
	name: "Twitter Ads",
	website: "https://ads.twitter.com",
	description: "Twitter Ads is an advertising platform for Twitter 'microblogging' system.",
	icon: "Twitter.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "twitter-ads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.ads-twitter\\.com\\/uwt\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twitter-ads:jsGlobal:1",
			kind: "jsGlobal",
			property: "twttr",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
