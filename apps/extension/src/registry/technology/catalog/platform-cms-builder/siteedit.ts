import type { TechnologyDefinition } from '@/lib/detection/types';

export const siteeditTechnologyDefinition: TechnologyDefinition = {
	id: 'siteedit',
	name: 'SiteEdit',
	website: 'https://www.siteedit.ru',
	description: 'SiteEdit is a Russian website builder and CMS.',
	icon: 'SiteEdit.png',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'siteedit:meta:0',
			kind: 'meta',
			key: 'generator',
			valuePattern: new RegExp('SiteEdit', 'i'),
			description: 'Meta tag matches a known technology marker.',
		},
		{
			id: 'siteedit:meta:1',
			kind: 'meta',
			key: 'generator',
			valuePattern: new RegExp('siteedit', 'i'),
			description: 'Meta tag matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
