import type { TechnologyDefinition } from '@/lib/detection/types';

export const indexExchangeTechnologyDefinition: TechnologyDefinition = {
	id: 'index-exchange',
	name: 'Index Exchange',
	website: 'https://www.indexexchange.com',
	description:
		'Index Exchange is a customizable exchange technology that enables sell side media firms to monetize ad inventories programmatically and in real time.',
	icon: 'Index Exchange.svg',
	categories: [
		'advertising-paid-media',
	],
	rules: [
		{
			id: 'index-exchange:requestUrl:0',
			kind: 'requestUrl',
			pattern: new RegExp('\\.casalemedia\\.com'),
			description: 'Observed request URL matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
