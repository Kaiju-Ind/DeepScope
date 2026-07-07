import type { TechnologyDefinition } from '../../types';

export const twitterCardTechnologyDefinition = {
	id: "twitter-card",
	name: "Twitter Card Metadata",
	website: "https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards",
	description: "Declares X/Twitter Card metadata used for rich link previews.",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "twitter-card:meta:card",
			kind: "meta",
			key: "twitter:card",
			valuePattern: new RegExp("^(?:summary|summary_large_image|app|player)$", "i"),
			confidence: 100,
			description: "Document declares a recognized Twitter Card type.",
		},
		{
			id: "twitter-card:meta:title",
			kind: "meta",
			key: "twitter:title",
			confidence: 75,
			description: "Document declares a Twitter Card title.",
		},
		{
			id: "twitter-card:meta:description",
			kind: "meta",
			key: "twitter:description",
			confidence: 75,
			description: "Document declares a Twitter Card description.",
		},
		{
			id: "twitter-card:meta:image",
			kind: "meta",
			key: "twitter:image",
			confidence: 75,
			description: "Document declares a Twitter Card image.",
		},
		{
			id: "twitter-card:meta:site",
			kind: "meta",
			key: "twitter:site",
			confidence: 60,
			description: "Document declares a Twitter/X account associated with the card.",
		},
	],
} as const satisfies TechnologyDefinition;
