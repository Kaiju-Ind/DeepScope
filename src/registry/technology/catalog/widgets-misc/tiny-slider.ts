import type { TechnologyDefinition } from '@/lib/detection/types';

export const tinySliderTechnologyDefinition: TechnologyDefinition = {
	id: 'tiny-slider',
	name: 'Tiny Slider',
	website: 'https://github.com/ganlanyuan/tiny-slider',
	description: 'Tiny Slider is a vanilla javascript slider for all purposes.',
	icon: 'default.svg',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'tiny-slider:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:\\/([\\d\\.]+)\\/min\\/)?tiny-slider(?:\\.min)?\\.js'),
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
