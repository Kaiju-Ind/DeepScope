import type { TechnologyDefinition } from '@/lib/detection/types';

export const sorryTechnologyDefinition: TechnologyDefinition = {
	id: 'sorry',
	name: 'Sorry',
	website: 'https://www.sorryapp.com',
	description: 'Sorry is a status page service that displays system downtime and operational incidents.',
	icon: 'Sorry.svg',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'sorry:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.sorryapp\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'mid',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
