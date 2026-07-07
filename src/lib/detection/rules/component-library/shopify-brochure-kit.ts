import type { TechnologyDefinition } from '../../types';

export const shopifyBrochureKitTechnologyDefinition = {
	id: 'shopify-brochure-kit',
	name: 'Shopify Brochure Kit',
	website: 'https://www.shopify.com/',
	description: 'Shopify Brochure Kit is Shopify’s internal component system for public marketing pages.',
	icon: 'Shopify.svg',
	categories: ['component-library'],
	rules: [
		{
			id: 'shopify-brochure-kit:html:0',
			kind: 'html',
			pattern: /data-component-extra-variant=["']brochure-kit-header["']|\bbk-header\b|\bbk-nav-/i,
			confidence: 95,
			description: 'Document markup contains Shopify Brochure Kit header and navigation markers.',
		},
		{
			id: 'shopify-brochure-kit:dom:1',
			kind: 'dom',
			selector: '[data-component-extra-variant="brochure-kit-header"], .bk-header, [id^="bk-nav-"]',
			confidence: 95,
			description: 'DOM contains Shopify Brochure Kit component markers.',
		},
	],
	requires: ['shopify'],
} as const satisfies TechnologyDefinition;
