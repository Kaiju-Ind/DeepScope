import type { TechnologyDefinition } from '../../types';

export const flexboxLayoutTechnologyDefinition = {
	id: "flexbox-layout",
	name: "CSS Flexbox Layout",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout",
	description: "Uses CSS Flexible Box layout declarations.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "flexbox-layout:html:display-flex",
			kind: "html",
			pattern: new RegExp("display\\s*:\\s*(?:inline-)?flex\\b", "i"),
			confidence: 95,
			description: "Inline CSS uses Flexbox layout.",
		},
		{
			id: "flexbox-layout:stylesheetContent:display-flex",
			kind: "stylesheetContent",
			pattern: new RegExp("display\\s*:\\s*(?:inline-)?flex\\b", "i"),
			confidence: 100,
			description: "Stylesheet CSS uses Flexbox layout.",
		},
		{
			id: "flexbox-layout:html:flex-properties",
			kind: "html",
			pattern: new RegExp("\\b(?:flex-(?:direction|wrap|flow|basis|grow|shrink)|align-items|align-self|justify-content|justify-items|gap)\\s*:", "i"),
			confidence: 65,
			description: "Inline CSS uses Flexbox-related alignment or sizing properties.",
		},
		{
			id: "flexbox-layout:stylesheetContent:flex-properties",
			kind: "stylesheetContent",
			pattern: new RegExp("\\b(?:flex-(?:direction|wrap|flow|basis|grow|shrink)|align-items|align-self|justify-content|justify-items|gap)\\s*:", "i"),
			confidence: 75,
			description: "Stylesheet CSS uses Flexbox-related alignment or sizing properties.",
		},
	],
} as const satisfies TechnologyDefinition;
