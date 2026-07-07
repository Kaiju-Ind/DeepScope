import type { TechnologyDefinition } from '../../types';

/**
 * Detects a modern CSS capability from inline or captured stylesheet content.
 * The HTML rule handles critical inline styles while the stylesheet rule covers
 * external CSS fetched during page load.
 */
export const cssContainerQueryUnitsTechnologyDefinition = {
	id: "css-container-query-units",
	name: "CSS Container Query Units",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries#container_query_length_units",
	description: "CSS container query units size elements relative to their query container rather than the viewport.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "css-container-query-units:html:0",
			kind: "html",
			pattern: /\b\d+(?:\.\d+)?(?:cqw|cqh|cqi|cqb|cqmin|cqmax)\b|(?:^|[^A-Za-z0-9_-])(?:cqw|cqh|cqi|cqb|cqmin|cqmax)\b/i,
			confidence: 75,
			description: "Inline document styles use CSS Container Query Units.",
		},
		{
			id: "css-container-query-units:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: /\b\d+(?:\.\d+)?(?:cqw|cqh|cqi|cqb|cqmin|cqmax)\b|(?:^|[^A-Za-z0-9_-])(?:cqw|cqh|cqi|cqb|cqmin|cqmax)\b/i,
			confidence: 90,
			description: "Captured stylesheet content uses CSS Container Query Units.",
		},
	],
} as const satisfies TechnologyDefinition;
