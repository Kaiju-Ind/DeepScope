import type { TechnologyDefinition } from '@/lib/detection/types';

export const snabbtTechnologyDefinition: TechnologyDefinition = {
	id: 'snabbt',
	name: 'Snabbt',
	website: 'https://daniel-lundin.github.io/snabbt.js/',
	description: 'Minimalistic animation library in javascript Snabbt.js.',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'snabbt:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:((?:\\d{1,9}\\.){1,12}\\d+)\\/)?snabbt(?:[\\.-]min)?\\.js'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'snabbt:scriptSrc:1',
			kind: 'scriptSrc',
			pattern: new RegExp('snabbt(?:[\\.-]min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?'),
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
