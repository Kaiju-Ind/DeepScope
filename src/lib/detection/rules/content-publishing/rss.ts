import type { TechnologyDefinition } from '../../types';

export const rssTechnologyDefinition = {
	id: "rss",
	name: "RSS",
	website: "https://www.rssboard.org/rss-specification",
	description: "Declares an RSS feed link.",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "rss:link:0",
			kind: "link",
			rel: "alternate",
			typePattern: new RegExp("application/rss\\+xml", "i"),
			confidence: 100,
			description: "Document links to an RSS feed.",
		},
	],
} as const satisfies TechnologyDefinition;
