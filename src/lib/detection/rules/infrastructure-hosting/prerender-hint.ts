import type { TechnologyDefinition } from '../../types';

export const prerenderHintTechnologyDefinition = {
	id: "prerender-hint",
	name: "Prerender Hint",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/prerender",
	description: "Hints that the browser may prepare a future page load ahead of navigation. Modern sites may use Speculation Rules instead.",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "prerender-hint:link:prerender",
			kind: "link",
			rel: "prerender",
			confidence: 100,
			description: "Document uses rel=prerender.",
		},
	],
} as const satisfies TechnologyDefinition;
