import type { TechnologyDefinition } from '@/lib/detection/types';

export const quicksellTechnologyDefinition: TechnologyDefinition = {
	id: 'quicksell',
	name: 'QuickSell',
	website: 'https://quicksell.co',
	description:
		'QuickSell is a sales acceleration platform helping businesses transform conversations to conversions by leveraging personal commerce.',
	icon: 'QuickSell.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'quicksell:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.quicksell\\.co\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
