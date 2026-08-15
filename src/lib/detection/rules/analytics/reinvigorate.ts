import type { TechnologyDefinition } from '../../types';

export const reinvigorateTechnologyDefinition: TechnologyDefinition = {
	id: 'reinvigorate',
	name: 'Reinvigorate',
	website: 'https://www.reinvigorate.net',
	icon: 'Reinvigorate.png',
	categories: [
		'analytics',
	],
	rules: [
		{
			id: 'reinvigorate:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'reinvigorate',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
