import type { TechnologyDefinition } from '@/lib/detection/types';

export const slimSeoTechnologyDefinition: TechnologyDefinition = {
	id: 'slim-seo',
	name: 'Slim SEO',
	website: 'https://wpslimseo.com',
	description:
		"Slim SEO is a full-featured SEO plugin for WordPress that's lightweight, blazing fast with minimum configuration.",
	icon: 'Slim-SEO.svg',
	categories: [
		'wordpress-ecosystem',
	],
	rules: [
		{
			id: 'slim-seo:dom:0',
			kind: 'dom',
			selector: '#slim-seo-schema',
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
		pricing: [
			'freemium',
			'low',
			'onetime',
			'recurring',
		],
	},
	requires: [
		'wordpress',
	],
} as const satisfies TechnologyDefinition;
