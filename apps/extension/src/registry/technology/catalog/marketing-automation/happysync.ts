import type { TechnologyDefinition } from '@/lib/detection/types';

export const happysyncTechnologyDefinition: TechnologyDefinition = {
	id: 'happysync',
	name: 'HappySync',
	website: 'https://www.happysync.io',
	description: 'HappySync is a Korean-developed tool designed for marketing automation and conversion optimization.',
	icon: 'HappySync.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'happysync:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('api\\.happysync\\.io\\/'),
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
