import type { TechnologyDefinition } from '@/lib/detection/types';

export const revenueRollTechnologyDefinition: TechnologyDefinition = {
	id: 'revenue-roll',
	name: 'Revenue Roll',
	website: 'https://www.revenueroll.com',
	description:
		'Revenue Roll is an identification and retargeting service designed to recognize website visitors and deliver targeted advertising based on user behavior.',
	icon: 'RevenueRoll.svg',
	categories: [
		'advertising-paid-media',
	],
	rules: [
		{
			id: 'revenue-roll:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.revenueroll\\.com'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'high',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
