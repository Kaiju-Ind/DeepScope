import type { TechnologyDefinition } from '../../types';

export const robotsMetaTechnologyDefinition = {
	id: "robots-meta",
	name: "Robots Meta Directives",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/robots",
	description: "Declares page-level crawler and indexing directives through robots metadata.",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "robots-meta:meta:robots",
			kind: "meta",
			key: "robots",
			valuePattern: new RegExp("\\b(?:index|noindex|follow|nofollow|none|noarchive|nosnippet|max-snippet|max-image-preview|max-video-preview|notranslate|noimageindex)\\b", "i"),
			confidence: 100,
			description: "Document declares robots crawler directives.",
		},
		{
			id: "robots-meta:meta:googlebot",
			kind: "meta",
			key: "googlebot",
			valuePattern: new RegExp("\\b(?:index|noindex|follow|nofollow|none|noarchive|nosnippet|max-snippet|max-image-preview|max-video-preview|notranslate|noimageindex)\\b", "i"),
			confidence: 95,
			description: "Document declares Googlebot crawler directives.",
		},
		{
			id: "robots-meta:meta:bingbot",
			kind: "meta",
			key: "bingbot",
			valuePattern: new RegExp("\\b(?:index|noindex|follow|nofollow|none|noarchive|nosnippet|max-snippet|max-image-preview|max-video-preview|notranslate|noimageindex)\\b", "i"),
			confidence: 95,
			description: "Document declares Bingbot crawler directives.",
		},
	],
} as const satisfies TechnologyDefinition;
