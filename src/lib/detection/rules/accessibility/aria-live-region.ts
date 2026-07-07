import type { TechnologyDefinition } from '../../types';

export const ariaLiveRegionTechnologyDefinition = {
	id: "aria-live-region",
	name: "ARIA Live Region",
	website: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live",
	description: "Uses aria-live regions for announcing dynamic content changes to assistive technology.",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "aria-live-region:html:0",
			kind: "html",
			pattern: new RegExp("\\saria-live\\s*=", "i"),
			confidence: 100,
			description: "Document contains aria-live.",
		},
	],
} as const satisfies TechnologyDefinition;
