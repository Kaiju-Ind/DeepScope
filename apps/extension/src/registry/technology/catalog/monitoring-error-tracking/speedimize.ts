import type { TechnologyDefinition } from '@/lib/detection/types';

export const speedimizeTechnologyDefinition: TechnologyDefinition = {
	id: 'speedimize',
	name: 'Speedimize',
	website: 'https://speedimize.io',
	description: 'Speedimize is a Shopify agency that focuses on website speed optimisation and performance issues.',
	icon: 'Speedimize.svg',
	categories: [
		'monitoring-error-tracking',
	],
	rules: [
		{
			id: 'speedimize:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('cdn\\.shopify\\.com\\/.+\\/assets\\/speedimize\\.js'),
			description: 'Script source URL matches a known technology marker.',
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
