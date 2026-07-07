import type { TechnologyDefinition } from '../../types';

export const resourcePrefetchTechnologyDefinition = {
	id: "resource-prefetch",
	name: "Resource Prefetch",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/prefetch",
	description: "Hints that the browser should fetch and cache a resource likely to be needed by a later navigation.",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "resource-prefetch:link:prefetch",
			kind: "link",
			rel: "prefetch",
			confidence: 100,
			description: "Document uses rel=prefetch.",
		},
	],
} as const satisfies TechnologyDefinition;
