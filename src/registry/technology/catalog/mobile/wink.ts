import type { TechnologyDefinition } from '@/lib/detection/types';

export const winkTechnologyDefinition: TechnologyDefinition = {
	id: 'wink',
	name: 'Wink',
	website: 'https://winktoolkit.org',
	description: 'Wink Toolkit is a JavaScript toolkit used to build mobile web apps.',
	icon: 'Wink.png',
	categories: [
		'mobile',
		'ui-library',
	],
	rules: [
		{
			id: 'wink:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:_base\\/js\\/base|wink).*\\.js'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'wink:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'wink.version',
			valuePattern: new RegExp('^(.+)$'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		cpe: 'cpe:2.3:a:wink:wink:*:*:*:*:*:android:*:*',
	},
} as const satisfies TechnologyDefinition;
