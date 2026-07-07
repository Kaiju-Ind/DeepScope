import type { TechnologyDefinition } from '../../types';

export const shopifyGtmProxyTechnologyDefinition = {
	id: 'shopify-gtm-proxy',
	name: 'Shopify GTM Proxy',
	website: 'https://www.shopify.com/',
	description: 'Shopify-hosted Google Tag Manager proxy endpoints forward analytics and advertising events through Shopify domains.',
	icon: 'Shopify.svg',
	categories: ['tag-management'],
	rules: [
		{
			id: 'shopify-gtm-proxy:requestUrl:0',
			kind: 'requestUrl',
			pattern: /gtm\d*\.shopify\.com\/(?:g\/collect|_\/service_worker|_\/set_cookie|logging)(?:[/?#]|$)/i,
			confidence: 100,
			description: 'Network activity uses Shopify-owned GTM proxy collection or service-worker endpoints.',
		},
		{
			id: 'shopify-gtm-proxy:resourceUrl:1',
			kind: 'resourceUrl',
			pattern: /gtm\d*\.shopify\.com\/(?:g\/collect|_\/service_worker|_\/set_cookie|logging)(?:[/?#]|$)/i,
			confidence: 95,
			description: 'Loaded resource URL references Shopify-owned GTM proxy endpoints.',
		},
		{
			id: 'shopify-gtm-proxy:link:2',
			kind: 'link',
			rel: 'preconnect',
			hrefPattern: /gtm\.shopify\.com\//i,
			confidence: 80,
			description: 'Document preconnects to Shopify-owned GTM proxy infrastructure.',
		},
	],
	requires: ['shopify'],
} as const satisfies TechnologyDefinition;
