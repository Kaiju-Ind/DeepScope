import type { TechnologyDefinition } from '@/lib/detection/types';

export const elcodiTechnologyDefinition: TechnologyDefinition = {
	id: 'elcodi',
	name: 'Elcodi',
	website: 'https://elcodi.io',
	icon: 'Elcodi.png',
	categories: [
		'platform-cms-builder',
	],
	rules: [],
	implies: [
		'php',
		'symfony',
	],
} as const satisfies TechnologyDefinition;
