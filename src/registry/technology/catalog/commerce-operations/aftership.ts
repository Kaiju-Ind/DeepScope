import type { TechnologyDefinition } from '@/lib/detection/types';

export const aftershipTechnologyDefinition: TechnologyDefinition = {
	id: 'aftership',
	name: 'AfterShip',
	website: 'https://www.aftership.com',
	description: 'AfterShip provides automated shipment tracking as a service.',
	icon: 'AfterShip.svg',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'aftership:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'aftership.__VERSION__',
			valuePattern: new RegExp('([\\d\\.]+)'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'freemium',
			'payg',
		],
	},
} as const satisfies TechnologyDefinition;
