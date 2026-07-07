import type { TechnologyDefinition } from '../../types';

export const appLinksMetaTechnologyDefinition = {
	id: "app-links-meta",
	name: "App Links Metadata",
	website: "https://applinks.org/documentation/",
	description: "Declares mobile or web deep-link metadata using the App Links meta vocabulary.",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "app-links-meta:html:0",
			kind: "html",
			pattern: new RegExp("<meta[^>]+(?:property|name)=[\"']al:(?:ios|android|ipad|iphone|web):", "i"),
			confidence: 95,
			description: "Document declares App Links metadata.",
		},
	],
} as const satisfies TechnologyDefinition;
