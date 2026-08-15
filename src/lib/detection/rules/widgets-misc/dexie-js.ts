import type { TechnologyDefinition } from '../../types';

export const dexieJsTechnologyDefinition: TechnologyDefinition = {
	id: 'dexie-js',
	name: 'Dexie.js',
	website: 'https://dexie.org',
	description: 'A Minimalistic Wrapper for IndexedDB.',
	icon: 'Dexie.js.png',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'dexie-js:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:((?:\\d{1,9}\\.){1,12}\\d+)\\/)?dexie(?:\\.bitrix)?(?:\\.bundle)?(?:\\.min)?\\.js'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
