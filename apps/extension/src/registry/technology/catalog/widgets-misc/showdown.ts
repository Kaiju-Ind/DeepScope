import type { TechnologyDefinition } from '@/lib/detection/types';

export const showdownTechnologyDefinition: TechnologyDefinition = {
	id: 'showdown',
	name: 'Showdown',
	website: 'https://showdownjs.com/',
	description: 'A Markdown to HTML converter written in Javascript.',
	icon: 'Showdown.png',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'showdown:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:(?:dist\\/)?)?showdown(?:\\.min)?(?:-?((?:\\d+\\.)+\\d+))?\\.js'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'showdown:scriptSrc:1',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:((?:\\d{1,9}\\.){1,12}\\d+)\\/(?:dist\\/)?)?showdown(?:\\.min)?(?:-)?\\.js'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'showdown:jsGlobal:2',
			kind: 'jsGlobal',
			property: 'showdown',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
