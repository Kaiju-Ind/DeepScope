import type { TechnologyDefinition } from '@/lib/detection/types';

export const sistemTechnologyDefinition: TechnologyDefinition = {
	id: 'sistem',
	name: 'Sistem',
	website: 'https://sistem.ai',
	description:
		'Sistem is a platform that develops customized artificial intelligence designed to understand and improve business operations.',
	icon: 'Sistem.svg',
	categories: [
		'analytics',
	],
	rules: [
		{
			id: 'sistem:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('js\\.sistem\\.ai'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
