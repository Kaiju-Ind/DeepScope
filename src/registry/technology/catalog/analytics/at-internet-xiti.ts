import type { TechnologyDefinition } from '@/lib/detection/types';

export const atInternetXitiTechnologyDefinition: TechnologyDefinition = {
	id: 'at-internet-xiti',
	name: 'AT Internet XiTi',
	website: 'https://atinternet.com/en',
	icon: 'AT Internet.png',
	categories: [
		'analytics',
	],
	rules: [
		{
			id: 'at-internet-xiti:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('xiti\\.com\\/hit\\.xiti'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'at-internet-xiti:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'xt_click',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
