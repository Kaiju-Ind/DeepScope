import type { TechnologyDefinition } from '../../types';

export const viewportMetaTechnologyDefinition = {
	id: "viewport-meta",
	name: "Viewport Meta",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag",
	description: "Declares viewport sizing and scaling behavior for responsive layouts.",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "viewport-meta:meta:0",
			kind: "meta",
			key: "viewport",
			confidence: 100,
			description: "Document declares a viewport meta tag.",
		},
	],
} as const satisfies TechnologyDefinition;
