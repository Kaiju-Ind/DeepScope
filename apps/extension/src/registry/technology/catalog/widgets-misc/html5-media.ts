import type { TechnologyDefinition } from '@/lib/detection/types';

export const html5MediaTechnologyDefinition: TechnologyDefinition = {
	id: 'html5-media',
	name: 'HTML5 Media',
	website: 'https://html5media.info/',
	description: 'HTML5 Media enables video and audio tags in all major browsers.',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'html5-media:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:((?:\\d{1,9}\\.){1,12}\\d+)\\/)?html5media(?:\\.min)?\\.js'),
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
