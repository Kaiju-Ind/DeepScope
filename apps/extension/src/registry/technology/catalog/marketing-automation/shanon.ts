import type { TechnologyDefinition } from '@/lib/detection/types';

export const shanonTechnologyDefinition: TechnologyDefinition = {
	id: 'shanon',
	name: 'Shanon',
	website: 'https://www.shanon.co.jp',
	description: 'Shanon provides marketing automation software.',
	icon: 'Shanon.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'shanon:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.shanon-services\\.com'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'high',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
