import type { TechnologyDefinition } from '@/lib/detection/types';

export const allbookableTechnologyDefinition: TechnologyDefinition = {
	id: 'allbookable',
	name: 'Allbookable',
	website: 'https://allbookable.com',
	description:
		'Allbookable is an online booking solution that enables users to book services through a digital platform.',
	icon: 'Allbookable.svg',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'allbookable:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.allbookable\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
