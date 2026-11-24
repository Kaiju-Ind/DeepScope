import type { TechnologyDefinition } from '@/lib/detection/types';

export const finalyticsTechnologyDefinition: TechnologyDefinition = {
	id: 'finalytics',
	name: 'Finalytics',
	website: 'https://finalytics.ai',
	description: 'Finalytics is a platform that uses data and analytics to transform customer experience.',
	icon: 'Finalytics.svg',
	categories: [
		'analytics',
	],
	rules: [
		{
			id: 'finalytics:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'finalytics.accountSummaryParser',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
