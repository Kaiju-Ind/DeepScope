import type { TechnologyDefinition } from '../../types';

export const canonicalUrlTechnologyDefinition = {
	id: "canonical-url",
	name: "Canonical URL",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/canonical",
	description: "Declares the canonical URL used for content indexing and syndication.",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "canonical-url:link:0",
			kind: "link",
			rel: "canonical",
			confidence: 100,
			description: "Document declares a canonical link.",
		},
	],
} as const satisfies TechnologyDefinition;
