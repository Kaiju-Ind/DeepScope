import type { TechnologyDefinition } from '@/lib/detection/types';

export const phenomTechnologyDefinition: TechnologyDefinition = {
	id: 'phenom',
	name: 'Phenom',
	website: 'https://www.phenom.com',
	description: 'Phenom is a talent relationship marketing platform.',
	icon: 'Phenom.svg',
	categories: [
		'business-tools',
	],
	rules: [
		{
			id: 'phenom:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('cdn\\.phenompeople\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
