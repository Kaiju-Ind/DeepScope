import type { TechnologyDefinition } from '@/lib/detection/types';

/** Detects author use of the ARIA Actions relationship shipped in Chromium 151. */
export const ariaActionsTechnologyDefinition: TechnologyDefinition = {
	id: 'aria-actions',
	name: 'ARIA Actions',
	website: 'https://w3c.github.io/aria/#aria-actions',
	description: 'ARIA Actions lets an accessible host expose related action targets through the aria-actions relationship.',
	categories: ['accessibility'],
	rules: [
		{
			id: 'aria-actions:dom:attribute',
			kind: 'dom',
			selector: '[aria-actions]',
			confidence: 100,
			description: 'Rendered DOM contains the ARIA Actions relationship attribute.',
		},
		{
			id: 'aria-actions:html:attribute',
			kind: 'html',
			pattern: /\saria-actions\s*=/i,
			confidence: 100,
			description: 'Captured HTML declares the ARIA Actions relationship attribute.',
		},
	],
} as const satisfies TechnologyDefinition;
