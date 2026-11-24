import type { TechnologyDefinition } from '@/lib/detection/types';

export const lagoonTechnologyDefinition: TechnologyDefinition = {
	id: 'lagoon',
	name: 'Lagoon',
	website: 'https://lagoon.sh/',
	description: 'The Open Source Application Delivery Platform for Kubernetes.',
	icon: 'lagoon.svg',
	categories: [
		'infrastructure-hosting',
	],
	rules: [],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
