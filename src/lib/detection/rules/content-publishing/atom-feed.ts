import type { TechnologyDefinition } from '../../types';

export const atomFeedTechnologyDefinition = {
	id: "atom-feed",
	name: "Atom Feed",
	website: "https://datatracker.ietf.org/doc/html/rfc4287",
	description: "Declares an Atom feed link.",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "atom-feed:link:0",
			kind: "link",
			rel: "alternate",
			typePattern: new RegExp("application/atom\\+xml", "i"),
			confidence: 100,
			description: "Document links to an Atom feed.",
		},
	],
} as const satisfies TechnologyDefinition;
