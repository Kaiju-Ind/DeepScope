import type { TechnologyDefinition } from '../../types';

export const twitterAppCardTechnologyDefinition = {
	id: "twitter-app-card",
	name: "Twitter App Card",
	website: "https://developer.x.com/en/docs/x-for-websites/cards/overview/app-card",
	description: "Declares mobile app metadata for X/Twitter app cards.",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "twitter-app-card:meta:iphone",
			kind: "meta",
			key: "twitter:app:id:iphone",
			confidence: 85,
			description: "Document declares a Twitter app card iPhone app id.",
		},
		{
			id: "twitter-app-card:meta:ipad",
			kind: "meta",
			key: "twitter:app:id:ipad",
			confidence: 85,
			description: "Document declares a Twitter app card iPad app id.",
		},
		{
			id: "twitter-app-card:meta:googleplay",
			kind: "meta",
			key: "twitter:app:id:googleplay",
			confidence: 85,
			description: "Document declares a Twitter app card Google Play app id.",
		},
	],
} as const satisfies TechnologyDefinition;
