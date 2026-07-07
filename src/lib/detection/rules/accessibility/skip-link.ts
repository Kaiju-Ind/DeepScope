import type { TechnologyDefinition } from '../../types';

export const skipLinkTechnologyDefinition = {
	id: "skip-link",
	name: "Skip Link",
	website: "https://webaim.org/techniques/skipnav/",
	description: "Provides a skip link for keyboard users to jump to page content.",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "skip-link:html:skip-to-content",
			kind: "html",
			pattern: new RegExp("<a\\b[^>]+href=[\"\\']#[^\"\\']+[\"\\'][^>]*>\\s*(?:skip to (?:content|main)|skip navigation)", "i"),
			confidence: 95,
			description: "Document contains a skip-to-content style anchor.",
		},
	],
} as const satisfies TechnologyDefinition;
