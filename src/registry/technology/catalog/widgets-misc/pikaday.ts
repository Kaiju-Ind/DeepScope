import type { TechnologyDefinition } from '@/lib/detection/types';

export const pikadayTechnologyDefinition: TechnologyDefinition = {
	id: 'pikaday',
	name: 'Pikaday',
	website: 'https://github.com/dbushell/Pikaday',
	description: 'A refreshing JavaScript Datepicker.',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'pikaday:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('pikaday(?:-jquery)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?'),
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
