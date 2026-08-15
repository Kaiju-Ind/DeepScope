import type { TechnologyDefinition } from '../../types';

export const vertaflowTechnologyDefinition: TechnologyDefinition = {
	id: 'vertaflow',
	name: 'VertaFlow',
	website: 'https://vertaflow.io',
	description:
		'VertaFlow is a vertical CRM and commerce platform with client portals, payments, storefront widgets, online ordering, messaging, and industry workflows.',
	icon: 'VertaFlow.svg',
	categories: ['business-tools'],
	rules: [
		{
			id: 'vertaflow:scriptSrc:pixel',
			kind: 'scriptSrc',
			pattern: /^https:\/\/api\.vertaflow\.io\/v1\/pixel\.js(?:[?#]|$)/i,
			confidence: 100,
			description: 'Script source loads the VertaFlow pixel from its first-party API origin.',
		},
		{
			id: 'vertaflow:dom:pixel-site',
			kind: 'dom',
			selector: 'script[src*="api.vertaflow.io/v1/pixel.js"][data-site]',
			confidence: 100,
			description: 'DOM contains the VertaFlow pixel and a tenant site identifier.',
		},
		{
			id: 'vertaflow:html:tenant-config',
			kind: 'html',
			pattern: /window\.__TENANT_CONFIG__\s*=/,
			confidence: 35,
			description:
				'HTML contains a tenant portal configuration global associated with VertaFlow; this generic marker needs corroborating evidence.',
		},
		{
			id: 'vertaflow:html:powered-by',
			kind: 'html',
			pattern: /Powered by VertaFlow/i,
			confidence: 100,
			description: 'HTML contains VertaFlow attribution.',
		},
	],
	metadata: { saas: true, pricing: ['freemium', 'low', 'mid', 'recurring'] },
} as const satisfies TechnologyDefinition;
