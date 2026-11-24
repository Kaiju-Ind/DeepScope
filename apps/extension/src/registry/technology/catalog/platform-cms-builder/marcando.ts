import type { TechnologyDefinition } from '@/lib/detection/types';

export const marcandoTechnologyDefinition: TechnologyDefinition = {
	id: 'marcando',
	name: 'Marcando',
	website: 'https://www.marcando.be',
	description: 'Marcando is a SaaS ecommerce solution designed to streamline online retail operations.',
	icon: 'Marcando.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'marcando:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.marcando\\.be\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'mid',
			'poa',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
