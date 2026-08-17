import type { TechnologyDefinition } from '@/lib/detection/types';

export const eshopcrmTechnologyDefinition: TechnologyDefinition = {
	id: 'eshopcrm',
	name: 'eShopCRM',
	website: 'https://eshopcrm.com',
	description: 'eShopCRM is an ecommerce CRM for Shopify.',
	icon: 'eShopCRM.png',
	categories: [
		'business-tools',
	],
	rules: [
		{
			id: 'eshopcrm:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('eshopcrm\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'poa',
		],
	},
	implies: [
		'shopify',
	],
} as const satisfies TechnologyDefinition;
