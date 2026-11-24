import type { TechnologyDefinition } from '@/lib/detection/types';

export const affiliatlyTechnologyDefinition: TechnologyDefinition = {
	id: 'affiliatly',
	name: 'Affiliatly',
	website: 'https://www.affiliatly.com',
	description: 'Affiliatly is an affiliate marketing software for ecommerce store owners.',
	icon: 'Affiliatly.png',
	categories: [
		'advertising-paid-media',
	],
	rules: [
		{
			id: 'affiliatly:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('static\\.affiliatly\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
