import type { TechnologyDefinition } from "../../types.ts";

/** Detects authored use of the `::details-content` pseudo-element, stable in Chrome 131. */
export const cssDetailsContentTechnologyDefinition: TechnologyDefinition = {
	id: 'css-details-content',
	name: 'CSS ::details-content',
	website: 'https://drafts.csswg.org/css-pseudo-4/#selectordef-details-content',
	description: 'The ::details-content pseudo-element selects the expandable content box of a details element.',
	categories: ['styling-processor'],
	rules: [
		{
			id: 'css-details-content:html:pseudo-element',
			kind: 'html',
			pattern: /::details-content(?![a-z0-9_-])/i,
			confidence: 100,
			description: 'Inline CSS contains the ::details-content pseudo-element.',
		},
		{
			id: 'css-details-content:stylesheetContent:pseudo-element',
			kind: 'stylesheetContent',
			pattern: /::details-content(?![a-z0-9_-])/i,
			confidence: 100,
			description: 'Stylesheet CSS contains the ::details-content pseudo-element.',
		},
	],
} as const satisfies TechnologyDefinition;
