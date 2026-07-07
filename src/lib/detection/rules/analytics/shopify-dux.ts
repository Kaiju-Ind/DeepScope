import type { TechnologyDefinition } from '../../types';

export const shopifyDuxTechnologyDefinition = {
	id: 'shopify-dux',
	name: 'Shopify DUX',
	website: 'https://www.shopify.com/',
	description: 'Shopify DUX records brochure-site interaction and performance events through Shopify-owned endpoints.',
	icon: 'Shopify.svg',
	categories: ['analytics'],
	rules: [
		{
			id: 'shopify-dux:html:0',
			kind: 'html',
			pattern: /window\.__brochureDuxConfig/i,
			confidence: 100,
			description: 'Document initializes the Shopify brochure DUX event handler config.',
		},
		{
			id: 'shopify-dux:jsGlobal:1',
			kind: 'jsGlobal',
			property: '__brochureDuxConfig.eventHandlerEndpoint',
			confidence: 100,
			description: 'Page global exposes the Shopify DUX event handler endpoint.',
		},
		{
			id: 'shopify-dux:requestUrl:2',
			kind: 'requestUrl',
			pattern: /\/\.well-known\/dux(?:[?#/]|$)/i,
			confidence: 100,
			description: 'Network activity posts or fetches Shopify DUX events.',
		},
		{
			id: 'shopify-dux:dom:3',
			kind: 'dom',
			selector: '[data-dux-initialized]',
			confidence: 90,
			description: 'Document body carries the Shopify DUX initialization marker.',
		},
	],
	requires: ['shopify'],
} as const satisfies TechnologyDefinition;
