import type { TechnologyDefinition } from '@/lib/detection/types';

export const gliaTechnologyDefinition: TechnologyDefinition = {
	id: 'glia',
	name: 'Glia',
	website: 'https://www.glia.com',
	description: 'Glia is a chat and digital assistant utilised across various industries.',
	icon: 'Glia.svg',
	categories: [
		'email-messaging',
	],
	rules: [
		{
			id: 'glia:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('api\\.glia\\.com\\/'),
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
