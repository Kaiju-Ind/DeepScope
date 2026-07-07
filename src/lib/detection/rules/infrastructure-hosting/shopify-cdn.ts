import type { TechnologyDefinition } from '../../types';

export const shopifyCdnTechnologyDefinition = {
	id: 'shopify-cdn',
	name: 'Shopify CDN',
	website: 'https://cdn.shopify.com/',
	description: 'Shopify CDN serves Shopify-hosted storefront, brochure, font, image, and JavaScript assets.',
	icon: 'Shopify.svg',
	categories: ['infrastructure-hosting'],
	rules: [
		{
			id: 'shopify-cdn:resourceUrl:0',
			kind: 'resourceUrl',
			pattern: /cdn\.shopify\.com\/(?:b\/shopify-brochure2-assets|shopifycloud\/)/i,
			confidence: 100,
			description: 'Loaded resource URL references Shopify CDN brochure or shopifycloud assets.',
		},
		{
			id: 'shopify-cdn:scriptSrc:1',
			kind: 'scriptSrc',
			pattern: /cdn\.shopify\.com\/shopifycloud\//i,
			confidence: 100,
			description: 'Script source URL is served from Shopify CDN shopifycloud assets.',
		},
		{
			id: 'shopify-cdn:stylesheetHref:2',
			kind: 'stylesheetHref',
			pattern: /cdn\.shopify\.com\/shopifycloud\//i,
			confidence: 100,
			description: 'Stylesheet URL is served from Shopify CDN shopifycloud assets.',
		},
		{
			id: 'shopify-cdn:link:3',
			kind: 'link',
			hrefPattern: /cdn\.shopify\.com\/(?:b\/shopify-brochure2-assets|shopifycloud\/)/i,
			confidence: 95,
			description: 'Document link references Shopify CDN assets.',
		},
	],
	requires: ['shopify'],
} as const satisfies TechnologyDefinition;
