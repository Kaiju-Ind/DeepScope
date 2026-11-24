import type { TechnologyDefinition } from '@/lib/detection/types';

export const sucuriTechnologyDefinition: TechnologyDefinition = {
	id: 'sucuri',
	name: 'Sucuri',
	website: 'https://sucuri.net/',
	description: 'Sucuri is a cybersecurity company that provides website security solutions and services.',
	icon: 'sucuri.png',
	categories: [
		'infrastructure-hosting',
		'wordpress-ecosystem',
		'security',
	],
	rules: [],
	requires: [
		'wordpress',
	],
} as const satisfies TechnologyDefinition;
