import type { TechnologyDefinition } from '@/lib/detection/types';

export const eloomiTechnologyDefinition: TechnologyDefinition = {
	id: 'eloomi',
	name: 'Eloomi',
	website: 'https://eloomi.com',
	description: 'Eloomi is a cloud-based learning management system (LMS) and performance management platform.',
	icon: 'Eloomi.png',
	categories: [
		'content-publishing',
	],
	rules: [
		{
			id: 'eloomi:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/\\/cdn\\.eloomi\\.com\\/'),
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
