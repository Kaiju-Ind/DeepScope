import type { TechnologyDefinition } from '@/lib/detection/types';

export const redditAdsTechnologyDefinition: TechnologyDefinition = {
	id: 'reddit-ads',
	name: 'Reddit Ads',
	website: 'https://advertising.reddithelp.com/',
	description: 'Reddit Ads is an online advertising offering from Reddit.',
	icon: 'Reddit.svg',
	categories: [
		'advertising-paid-media',
	],
	rules: [
		{
			id: 'reddit-ads:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('www\\.redditstatic\\.com'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
