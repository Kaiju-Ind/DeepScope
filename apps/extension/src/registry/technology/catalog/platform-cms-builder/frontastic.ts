import type { TechnologyDefinition } from '@/lib/detection/types';

export const frontasticTechnologyDefinition: TechnologyDefinition = {
	id: 'frontastic',
	name: 'Frontastic',
	website: 'https://www.frontastic.cloud/',
	description:
		'Frontastic is a Commerce Frontend Platform that unites business and development teams to build commerce sites on headless.',
	icon: 'Frontastic.png',
	categories: [
		'platform-cms-builder',
	],
	rules: [],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
