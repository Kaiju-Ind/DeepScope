import type { TechnologyDefinition } from '@/lib/detection/types';

export const envoStorefrontTechnologyDefinition: TechnologyDefinition = {
	id: 'envo-storefront',
	name: 'Envo Storefront',
	website: 'https://envothemes.com/free-envo-storefront',
	description: 'Envo Storefront is a fast, clean and modern-looking responsive WooCommerce theme for WordPress.',
	icon: 'Envo Themes.png',
	categories: [
		'wordpress-ecosystem',
	],
	rules: [
		{
			id: 'envo-storefront:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp(
				'\\/wp-content\\/themes\\/envo-storefront\\/.+customscript\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?',
			),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
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
