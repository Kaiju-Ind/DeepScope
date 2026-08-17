import type { TechnologyDefinition } from '@/lib/detection/types';

export const themegraphyGraphyTechnologyDefinition: TechnologyDefinition = {
	id: 'themegraphy-graphy',
	name: 'Themegraphy Graphy',
	website: 'https://themegraphy.com/wordpress-themes/graphy',
	description:
		'Themegraphy Graphy is now compatible with WordPress 5.0 and WordPress Block Editor blog-oriented WordPress theme.',
	icon: 'Themegraphy.png',
	categories: [
		'wordpress-ecosystem',
	],
	rules: [
		{
			id: 'themegraphy-graphy:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/wp-content\\/themes\\/graphy(?:-pro)?\\/'),
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
