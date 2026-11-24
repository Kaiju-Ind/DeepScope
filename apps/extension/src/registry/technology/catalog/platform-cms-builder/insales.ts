import type { TechnologyDefinition } from '@/lib/detection/types';

export const insalesTechnologyDefinition: TechnologyDefinition = {
	id: 'insales',
	name: 'inSales',
	website: 'https://www.insales.com',
	description: 'inSales is a SaaS ecommerce platform with multichannel integration.',
	icon: 'inSales.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'insales:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'InSales',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'insales:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'InSalesUI',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'insales:jsGlobal:2',
			kind: 'jsGlobal',
			property: 'insalesGeocodeResults',
			description: 'Page-owned global matches a known technology marker.',
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
