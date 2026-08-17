import type { TechnologyDefinition } from '@/lib/detection/types';

export const virtusizeTechnologyDefinition: TechnologyDefinition = {
	id: 'virtusize',
	name: 'Virtusize',
	website: 'https://www.virtusize.com',
	description:
		"Virtusize is a personalisation service that provides size and product recommendations specific to a user's size and trend preferences.",
	icon: 'Virtusize.svg',
	categories: [
		'experimentation-optimization',
	],
	rules: [
		{
			id: 'virtusize:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.virtusize\\.jp\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
