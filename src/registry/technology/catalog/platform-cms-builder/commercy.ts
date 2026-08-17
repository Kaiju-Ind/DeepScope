import type { TechnologyDefinition } from '@/lib/detection/types';

export const commercyTechnologyDefinition: TechnologyDefinition = {
	id: 'commercy',
	name: 'Commercy',
	website: 'https://commercy.com.ar',
	description:
		'Commercy is an Argentine commerce platform that combines an online store, point of sale, inventory, and electronic invoicing.',
	icon: 'Commercy.svg',
	categories: ['platform-cms-builder'],
	rules: [
		{
			id: 'commercy:meta:generator',
			kind: 'meta',
			key: 'generator',
			valuePattern: /^Commercy$/i,
			confidence: 100,
			description: 'Generator metadata identifies the Commercy platform.',
		},
	],
	metadata: { saas: true, pricing: ['low', 'recurring'] },
	implies: ['next-js'],
} as const satisfies TechnologyDefinition;
