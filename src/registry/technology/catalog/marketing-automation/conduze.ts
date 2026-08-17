import type { TechnologyDefinition } from '@/lib/detection/types';

export const conduzeTechnologyDefinition: TechnologyDefinition = {
	id: 'conduze',
	name: 'Conduze',
	website: 'https://www.conduze.com',
	description:
		'Conduze is a call tracking and pop-up solution designed to help businesses capture and analyze inbound leads.',
	icon: 'Conduze.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'conduze:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('cdn\\.conduze\\.com'),
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
