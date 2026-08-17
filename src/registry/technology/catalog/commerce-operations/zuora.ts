import type { TechnologyDefinition } from '@/lib/detection/types';

export const zuoraTechnologyDefinition: TechnologyDefinition = {
	id: 'zuora',
	name: 'Zuora',
	website: 'https://www.zuora.com',
	description: 'Zuora is a platform that offers subscription billing management software.',
	icon: 'Zuora.svg',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'zuora:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.zuora\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'poa',
		],
	},
} as const satisfies TechnologyDefinition;
