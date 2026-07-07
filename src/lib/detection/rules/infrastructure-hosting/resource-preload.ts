import type { TechnologyDefinition } from '../../types';

export const resourcePreloadTechnologyDefinition = {
	id: "resource-preload",
	name: "Resource Preload",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload",
	description: "Preloads a resource declared by the page for earlier fetching.",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "resource-preload:link:0",
			kind: "link",
			rel: "preload",
			confidence: 100,
			description: "Document uses rel=preload.",
		},
	],
} as const satisfies TechnologyDefinition;
