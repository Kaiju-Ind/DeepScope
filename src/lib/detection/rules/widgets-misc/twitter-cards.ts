import type { TechnologyDefinition } from '../../types';

export const twitterCardsTechnologyDefinition = {
	id: "twitter-cards",
	name: "Twitter Cards",
	website: "https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards",
	description: "Declares X/Twitter card metadata for rich link previews.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "twitter-cards:meta:card",
			kind: "meta",
			key: "twitter:card",
			confidence: 100,
			description: "Document declares twitter:card metadata.",
		},
		{
			id: "twitter-cards:html:metadata",
			kind: "html",
			pattern: new RegExp("<meta[^>]+(?:property|name)=[\"\\']twitter:[^\"\\']+[\"\\']", "i"),
			confidence: 65,
			description: "Document contains Twitter card metadata.",
		},
	],
} as const satisfies TechnologyDefinition;
