import type { TechnologyDefinition } from '@/lib/detection/types';

export const simplTechnologyDefinition: TechnologyDefinition = {
	id: 'simpl',
	name: 'Simpl',
	website: 'https://getsimpl.com',
	description:
		'Simpl is a fintech company that offers a cardless payment network with multiple solutions for merchants and consumers.',
	icon: 'Simpl.svg',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'simpl:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'simplSettings',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
