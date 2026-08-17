import type { TechnologyDefinition } from '@/lib/detection/types';

export const brtTechnologyDefinition: TechnologyDefinition = {
	id: 'brt',
	name: 'BRT',
	website: 'https://www.brt.it',
	description: 'BRT, also known as Bartolini, is an Italian-based logistics service provider.',
	icon: 'BRT.svg',
	categories: [
		'commerce-operations',
	],
	rules: [],
} as const satisfies TechnologyDefinition;
