import type { TechnologyDefinition } from '@/lib/detection/types';

export const dishTechnologyDefinition: TechnologyDefinition = {
	id: 'dish',
	name: 'DISH',
	website: 'https://www.dish.co/XX',
	description:
		'DISH is a platform that allows restaurants to independently manage online reservations and customer orders.',
	icon: 'DISH.svg',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'dish:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.dish\\.co'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
