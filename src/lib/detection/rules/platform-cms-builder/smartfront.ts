import type { TechnologyDefinition } from '../../types';

export const smartfrontTechnologyDefinition: TechnologyDefinition = {
	id: 'smartfront',
	name: 'SmartFront',
	website: 'https://smartfront.io',
	description:
		'SmartFront is a multi-tenant headless storefront and administration platform that runs on an existing commerce backend or its own native commerce.',
	icon: 'SmartFront.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'smartfront:dom:shell-head',
			kind: 'dom',
			selector: '[data-sf-shell-page-head]',
			confidence: 85,
			description: 'DOM contains the SmartFront shell page-head marker.',
		},
		{
			id: 'smartfront:dom:theme-vars',
			kind: 'dom',
			selector: 'style#sf-theme-vars',
			confidence: 75,
			description: 'DOM contains the SmartFront theme variables element.',
		},
		{
			id: 'smartfront:dom:tenant-css',
			kind: 'dom',
			selector: 'div#sf-tenant-css',
			confidence: 75,
			description: 'DOM contains the SmartFront tenant CSS element.',
		},
		{
			id: 'smartfront:meta:generator',
			kind: 'meta',
			key: 'generator',
			valuePattern: /^SmartFront(?: ([\d.]+))?$/i,
			confidence: 100,
			version: { source: 'match', group: 1 },
			description: 'Generator metadata identifies SmartFront and may expose its version.',
		},
	],
	metadata: {
		saas: true,
		pricing: ['mid', 'freemium', 'recurring', 'onetime'],
	},
	implies: ['next-js'],
} as const satisfies TechnologyDefinition;
