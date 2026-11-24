import type { TechnologyDefinition } from '@/lib/detection/types';

export const pannellumTechnologyDefinition: TechnologyDefinition = {
	id: 'pannellum',
	name: 'Pannellum',
	website: 'https://pannellum.org/',
	description: 'Pannellum is a lightweight, free, and open source panorama viewer for the web.',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'pannellum:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:((?:\\d{1,9}\\.){1,12}\\d+)\\/(?:build\\/)?)?pannellum(?:-plugin)?\\.js'),
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
