import type { TechnologyDefinition } from '@/lib/detection/types';

export const sitelockTechnologyDefinition: TechnologyDefinition = {
	id: 'sitelock',
	name: 'SiteLock',
	website: 'https://www.sitelock.com',
	description: 'SiteLock is a security service that protects websites from hackers, malware, and other threats.',
	icon: 'SiteLock.svg',
	categories: [
		'security',
	],
	rules: [
		{
			id: 'sitelock:dom:0',
			kind: 'dom',
			selector: "a[href*='#'] > img[src*='.sitelock.com/']",
			description: 'DOM selector matches a known technology marker.',
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
