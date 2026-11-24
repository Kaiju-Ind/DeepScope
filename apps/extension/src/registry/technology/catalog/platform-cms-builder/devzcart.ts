import type { TechnologyDefinition } from '@/lib/detection/types';

export const devzcartTechnologyDefinition: TechnologyDefinition = {
	id: 'devzcart',
	name: 'DevzCart',
	website: 'https://devzcart.com',
	description:
		'DevzCart is a platform that offers automated courier updates, real-time order tracking, and custom landing pages to simplify operational workflows.',
	icon: 'DevzCart.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'devzcart:cookie:0',
			kind: 'cookie',
			keyPattern: new RegExp('^devzcart_session$', 'i'),
			description: 'Cookie name matches a known technology marker.',
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
