import type { TechnologyDefinition } from '@/lib/detection/types';

export const flockrocketTechnologyDefinition: TechnologyDefinition = {
	id: 'flockrocket',
	name: 'FlockRocket',
	website: 'https://flockrocket.io',
	description: 'FlockRocket is a reviews system designed to collect, manage, and display verified customer feedback.',
	icon: 'FlockRocket.svg',
	categories: [
		'community-ugc',
	],
	rules: [
		{
			id: 'flockrocket:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('app\\.flockrocket\\.io'),
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
