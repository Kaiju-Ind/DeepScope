import type { TechnologyDefinition } from '@/lib/detection/types';

export const autoketingTechnologyDefinition: TechnologyDefinition = {
	id: 'autoketing',
	name: 'Autoketing',
	website: 'https://autoketing.com',
	description: 'Autoketing is a marketing automation platform.',
	icon: 'Autoketing.png',
	categories: [
		'marketing-automation',
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			'freemium',
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
