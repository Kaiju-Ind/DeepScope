import type { TechnologyDefinition } from '@/lib/detection/types';

export const evolokTechnologyDefinition: TechnologyDefinition = {
	id: 'evolok',
	name: 'Evolok',
	website: 'https://www.evolok.com',
	description: 'Evolok is an engagement and monetization platform for digital media.',
	icon: 'Evolok.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'evolok:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'evo_client',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'evolok:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'evo_endpoint',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
