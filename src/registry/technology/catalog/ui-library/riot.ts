import type { TechnologyDefinition } from '@/lib/detection/types';

/**
 * Second source fragment for `riot-js`. It was a separate `riot` id, so one
 * product was reported twice; the registry merges fragments that share an id.
 */
export const riotTechnologyDefinition: TechnologyDefinition = {
	id: 'riot-js',
	name: 'Riot',
	website: 'https://riot.js.org/',
	icon: 'Riot.png',
	categories: [
		'ui-library',
	],
	rules: [
		{
			id: 'riot-js:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('riot(?:\\+compiler)?(?:\\.min)?\\.js'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'riot-js:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'riot',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
