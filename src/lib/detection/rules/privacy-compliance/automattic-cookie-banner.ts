import type { TechnologyDefinition } from '../../types';

export const automatticCookieBannerTechnologyDefinition = {
	id: 'automattic-cookie-banner',
	name: 'Automattic Cookie Banner',
	website: 'https://automattic.com/cookies/',
	description: 'Automattic Cookie Banner presents cookie consent and privacy preferences on Automattic-operated sites.',
	icon: 'WordPress.svg',
	categories: ['privacy-compliance'],
	rules: [
		{
			id: 'automattic-cookie-banner:html:0',
			kind: 'html',
			pattern: /a8c-cookie-banner|a8c-do-not-sell/i,
			confidence: 100,
			description: 'Document contains Automattic cookie-banner or do-not-sell markup.',
		},
		{
			id: 'automattic-cookie-banner:dom:1',
			kind: 'dom',
			selector: '.a8c-cookie-banner, .a8c-do-not-sell, [class*="a8c-cookie-banner"]',
			confidence: 100,
			description: 'DOM contains Automattic cookie-banner controls.',
		},
		{
			id: 'automattic-cookie-banner:stylesheetContent:2',
			kind: 'stylesheetContent',
			pattern: /a8c-cookie-banner|a8c-do-not-sell/i,
			confidence: 90,
			description: 'Captured stylesheet content styles Automattic privacy controls.',
		},
	],
} as const satisfies TechnologyDefinition;
