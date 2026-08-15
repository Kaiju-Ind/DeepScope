import type { TechnologyDefinition } from '../../types';

export const mangeznotezTechnologyDefinition: TechnologyDefinition = {
	id: 'mangeznotez',
	name: 'Mangeznotez',
	website: 'https://www.mangeznotez.com',
	description: 'Mangeznotez is a restaurant table booking widget.',
	icon: 'Mangeznotez.svg',
	categories: [
		'widgets-misc',
		'booking-scheduling',
	],
	rules: [
		{
			id: 'mangeznotez:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('www\\.mangeznotez\\.\\w+'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'mangeznotez:scriptSrc:1',
			kind: 'scriptSrc',
			pattern: new RegExp('\\w{1,40}.mangeznotez\\.\\w+(?:[^"\'\\s]{0,200}\\?ver=([\\d.]{1,20}))?'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
