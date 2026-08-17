import type { TechnologyDefinition } from '@/lib/detection/types';

export const jumboTechnologyDefinition: TechnologyDefinition = {
	id: 'jumbo',
	name: 'Jumbo',
	website: 'https://www.tryjumbo.com/',
	description: 'Jumbo is a page speed optimizer app for Shopify based sites.',
	icon: 'Jumbo.png',
	categories: [
		'monitoring-error-tracking',
	],
	rules: [
		{
			id: 'jumbo:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('mt\\.tryjumbo\\.com'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	implies: [
		'shopify',
	],
} as const satisfies TechnologyDefinition;
