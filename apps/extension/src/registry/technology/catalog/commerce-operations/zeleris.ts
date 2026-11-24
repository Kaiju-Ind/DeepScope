import type { TechnologyDefinition } from '@/lib/detection/types';

export const zelerisTechnologyDefinition: TechnologyDefinition = {
	id: 'zeleris',
	name: 'Zeleris',
	website: 'https://www.zeleris.com',
	description: 'Zeleris provides door to door shipment delivery to Ireland, UK and the EU.',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'zeleris:text:0',
			kind: 'text',
			pattern: new RegExp('\\bZeleris\\b'),
			description: 'Page text contains a known technology marker.',
		},
		{
			id: 'zeleris:text:1',
			kind: 'text',
			pattern: new RegExp('\\bZeleris\\b'),
			description: 'Page text contains a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
