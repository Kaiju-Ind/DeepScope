import type { TechnologyDefinition } from '../../types';

export const containerQueriesTechnologyDefinition = {
	id: "container-queries",
	name: "CSS Container Queries",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries",
	description: "Uses CSS container queries for component-level responsive styling.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "container-queries:html:0",
			kind: "html",
			pattern: new RegExp("@container\\b|container(?:-(?:type|name))?\\s*:", "i"),
			confidence: 90,
			description: "Inline CSS uses container query features.",
		},
		{
			id: "container-queries:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("@container\\b|container(?:-(?:type|name))?\\s*:", "i"),
			confidence: 100,
			description: "Stylesheet CSS uses container query features.",
		},
	],
} as const satisfies TechnologyDefinition;
