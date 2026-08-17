import type { TechnologyDefinition } from '@/lib/detection/types';

export const sidrTechnologyDefinition: TechnologyDefinition = {
	id: 'sidr',
	name: 'sidr',
	website: 'https://www.albertovarela.net/sidr/',
	description: 'Sidr is a jQuery plugin for creating side menus.',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'sidr:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('sidr(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?'),
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
