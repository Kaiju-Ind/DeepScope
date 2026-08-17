import type { TechnologyDefinition } from '@/lib/detection/types';

export const optimizelyCommerceTechnologyDefinition: TechnologyDefinition = {
	id: 'optimizely-commerce',
	name: 'Optimizely Commerce',
	website: 'https://www.optimizely.com/products/commerce/b2c/',
	description:
		'Optimizely Commerce is a complete suite for digital ecommerce and content management that uses artificial intelligence to deliver personalised experiences, individualised search rankings and product recommendations.',
	icon: 'Optimizely.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		// Commerce cannot be distinguished from the base Optimizely CMS with the former public signals.
	],
	requires: [
		'optimizely-content-management',
	],
	metadata: {
		pricing: [
			'poa',
		],
	},
} as const satisfies TechnologyDefinition;
