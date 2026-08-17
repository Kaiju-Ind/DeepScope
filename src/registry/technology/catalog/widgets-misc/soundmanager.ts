import type { TechnologyDefinition } from '@/lib/detection/types';

export const soundmanagerTechnologyDefinition: TechnologyDefinition = {
	id: 'soundmanager',
	name: 'SoundManager',
	website: 'https://www.schillmania.com/projects/soundmanager2',
	icon: 'SoundManager.png',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'soundmanager:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'BaconPlayer',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'soundmanager:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'SoundManager',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'soundmanager:jsGlobal:2',
			kind: 'jsGlobal',
			property: 'soundManager.version',
			valuePattern: new RegExp('V(.{1,80}) '),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Page-owned global matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
