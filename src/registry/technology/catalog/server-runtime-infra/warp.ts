import type { TechnologyDefinition } from '@/lib/detection/types';

export const warpTechnologyDefinition: TechnologyDefinition = {
	id: 'warp',
	name: 'Warp',
	website: 'https://www.stackage.org/package/warp',
	icon: 'Warp.png',
	categories: [
		'server-runtime-infra',
	],
	rules: [
		{
			id: 'warp:header:0',
			kind: 'header',
			key: 'Server',
			valuePattern: new RegExp('^Warp\\/(\\d+(?:\\.\\d+)+)?$', 'i'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'warp:header:1',
			kind: 'header',
			key: 'server',
			valuePattern: new RegExp('^warp\\/(\\d+(?:\\.\\d+)+)?$', 'i'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Response header matches a known technology marker.',
		},
	],
	implies: [
		'haskell',
	],
} as const satisfies TechnologyDefinition;
