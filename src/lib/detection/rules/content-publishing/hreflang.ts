import type { TechnologyDefinition } from '../../types';

export const hreflangTechnologyDefinition = {
	id: "hreflang",
	name: "Hreflang Alternate Links",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/alternate",
	description: "Declares language or locale alternates for content indexing and discovery.",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "hreflang:link:0",
			kind: "link",
			rel: "alternate",
			hreflangPattern: new RegExp("^[A-Za-z]{2,3}(?:-[A-Za-z0-9]+)?$|^x-default$", "i"),
			confidence: 100,
			description: "Document links to hreflang alternates.",
		},
	],
} as const satisfies TechnologyDefinition;
