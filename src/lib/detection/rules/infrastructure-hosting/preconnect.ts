import type { TechnologyDefinition } from '../../types';

export const preconnectTechnologyDefinition = {
	id: "preconnect",
	name: "Preconnect",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preconnect",
	description: "Hints that the browser should preconnect to another origin.",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "preconnect:link:0",
			kind: "link",
			rel: "preconnect",
			confidence: 100,
			description: "Document uses rel=preconnect.",
		},
	],
} as const satisfies TechnologyDefinition;
