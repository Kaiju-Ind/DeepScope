import type { TechnologyDefinition } from '@/lib/detection/types';

export const loadifyTechnologyDefinition: TechnologyDefinition = {
	id: 'loadify',
	name: 'Loadify',
	website: 'https://apps.shopify.com/loadify',
	description:
		'Loadify is a shopify app which helps merchants deploy performance techniques like loading screen, transitions & lazy Load.',
	icon: 'Loadify.png',
	categories: [
		'monitoring-error-tracking',
		'ecommerce-extensions',
	],
	rules: [
		{
			id: 'loadify:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.loadifyapp\\.ninety9\\.dev'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	implies: [
		'shopify',
	],
} as const satisfies TechnologyDefinition;
