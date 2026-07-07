import type { TechnologyDefinition } from '../../types';

export const nativeLazyLoadingTechnologyDefinition = {
	id: "native-lazy-loading",
	name: "Native Lazy Loading",
	website: "https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading",
	description: "Uses the native loading attribute to delay image or iframe loading.",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "native-lazy-loading:html:0",
			kind: "html",
			pattern: new RegExp("<(?:img|iframe)\\b[^>]+\\bloading=[\"']lazy[\"']", "i"),
			confidence: 100,
			description: "Document uses native lazy loading on an image or iframe.",
		},
	],
} as const satisfies TechnologyDefinition;
