import type { TechnologyDefinition } from '@/lib/detection/types';

export const adrecoverTechnologyDefinition: TechnologyDefinition = {
	id: 'adrecover',
	name: 'AdRecover',
	website: 'https://www.adrecover.com',
	description: 'AdRecover is a tool that helps online publishers monetise their Adblock inventory.',
	icon: 'adrecover.png',
	categories: [
		'advertising-paid-media',
	],
	rules: [
		{
			id: 'adrecover:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'adRecover.ap',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
