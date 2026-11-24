import type { TechnologyDefinition } from '@/lib/detection/types';

export const tripleWhaleTechnologyDefinition: TechnologyDefinition = {
	id: 'triple-whale',
	name: 'Triple Whale',
	website: 'https://triplewhale.com/',
	description:
		'The Triple Whale platform combines centralization, visualization, and attribution into a dashboard that presents and illustrates KPIs in an actionable way.',
	icon: 'triplewhale.svg',
	categories: [
		'analytics',
	],
	rules: [
		{
			id: 'triple-whale:requestUrl:0',
			kind: 'requestUrl',
			pattern: new RegExp('triplewhale-pixel\\.web\\.app'),
			description: 'Observed request URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'mid',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
