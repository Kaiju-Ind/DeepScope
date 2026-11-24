import type { TechnologyDefinition } from '@/lib/detection/types';

/** Detects script use of the Soft Navigation performance timeline entry. */
export const softNavigationApiTechnologyDefinition: TechnologyDefinition = {
	id: 'soft-navigation-api',
	name: 'Soft Navigations API',
	website: 'https://developer.chrome.com/docs/web-platform/soft-navigations',
	description:
		'The Soft Navigations API exposes soft-navigation performance entries for interaction-driven same-document navigations in single-page applications.',
	categories: ['monitoring-error-tracking'],
	rules: [
		{
			id: 'soft-navigation-api:scriptContent:observe',
			kind: 'scriptContent',
			pattern: /\.observe\s*\(\s*\{[^}]{0,300}\btype\s*:\s*["']soft-navigation["']/i,
			confidence: 100,
			description: 'Script observes the soft-navigation PerformanceEntry type.',
		},
		{
			id: 'soft-navigation-api:scriptContent:get-entries',
			kind: 'scriptContent',
			pattern: /\bgetEntriesByType\s*\(\s*["']soft-navigation["']\s*\)/i,
			confidence: 100,
			description: 'Script reads buffered soft-navigation performance entries.',
		},
	],
} as const satisfies TechnologyDefinition;
