import type { TechnologyDefinition } from '@/lib/detection/types';

export const lunrJsTechnologyDefinition: TechnologyDefinition = {
	id: 'lunr-js',
	name: 'Lunr.js',
	website: 'https://lunrjs.com/',
	description: 'A very simple search index.',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'lunr-js:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:((?:\\d{1,9}\\.){1,12}\\d+)\\/)?lunr(?:-store)?(?:-en)?(?:\\.min)?\\.js'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'lunr-js:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'lunr',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
