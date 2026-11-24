import type { TechnologyDefinition } from '@/lib/detection/types';

export const themeansarNewsupTechnologyDefinition: TechnologyDefinition = {
	id: 'themeansar-newsup',
	name: 'Themeansar Newsup',
	website: 'https://themeansar.com/free-themes/newsup',
	description: 'Themeansar Newsup is a fast, clean, modern-looking responsive news magazine WordPress theme.',
	icon: 'Themeansar.png',
	categories: [
		'wordpress-ecosystem',
	],
	rules: [
		{
			id: 'themeansar-newsup:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/wp-content\\/themes\\/newsup(?:-pro)?\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		pricing: [
			'freemium',
			'onetime',
		],
	},
	requires: [
		'wordpress',
	],
} as const satisfies TechnologyDefinition;
