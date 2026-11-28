import type { TechnologyDefinition } from "../../types.ts";

/** Detects script use of the Interaction Contentful Paint performance timeline entry. */
export const interactionContentfulPaintApiTechnologyDefinition: TechnologyDefinition = {
	id: 'interaction-contentful-paint-api',
	name: 'Interaction Contentful Paint API',
	website: 'https://developer.chrome.com/blog/new-in-chrome-151#soft_navigations_and_interaction_performance_metrics',
	description:
		'The Interaction Contentful Paint API exposes interaction-contentful-paint performance entries for content painted after user interactions.',
	categories: ['monitoring-error-tracking'],
	rules: [
		{
			id: 'interaction-contentful-paint-api:scriptContent:observe',
			kind: 'scriptContent',
			pattern: /\.observe\s*\(\s*\{[^}]{0,300}\btype\s*:\s*["']interaction-contentful-paint["']/i,
			confidence: 100,
			description: 'Script observes the interaction-contentful-paint PerformanceEntry type.',
		},
		{
			id: 'interaction-contentful-paint-api:scriptContent:get-entries',
			kind: 'scriptContent',
			pattern: /\bgetEntriesByType\s*\(\s*["']interaction-contentful-paint["']\s*\)/i,
			confidence: 100,
			description: 'Script reads buffered interaction-contentful-paint performance entries.',
		},
	],
} as const satisfies TechnologyDefinition;
