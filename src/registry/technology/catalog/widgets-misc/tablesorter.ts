import type { TechnologyDefinition } from '@/lib/detection/types';

export const tablesorterTechnologyDefinition: TechnologyDefinition = {
	id: 'tablesorter',
	name: 'Tablesorter',
	website: 'https://mottie.github.io/tablesorter/',
	description: 'Flexible client-side table sorting.',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'tablesorter:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp(
				'(?:((?:\\d{1,9}\\.){1,12}\\d+)[-\\/](?:dist\\/js\\/)?)?(?:jquery\\.)?tablesorter(?:[\\.\\/]pager)?(?:-custom-controls)?(?:\\.widgets)?(?:\\.min)?\\.js',
			),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
