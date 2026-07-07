import type { TechnologyDefinition } from '../../types';

export const responsiveImagesSrcsetTechnologyDefinition = {
	id: "responsive-images-srcset",
	name: "Responsive Images srcset",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset",
	description: "Uses srcset for responsive image candidates across different viewport sizes or pixel densities.",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "responsive-images-srcset:html:0",
			kind: "html",
			pattern: new RegExp("\\ssrcset=[\"\\']", "i"),
			confidence: 100,
			description: "Document uses srcset.",
		},
	],
} as const satisfies TechnologyDefinition;
