import type { TechnologyDefinition } from '@/lib/detection/types';

export const merchelloTechnologyDefinition: TechnologyDefinition = {
	id: 'merchello',
	name: 'Merchello',
	website: 'https://merchello.readme.io/docs/overview',
	description: 'Merchello is an open source ecommerce package for the Umbraco CMS.',
	icon: 'Merchello.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'merchello:cookie:0',
			kind: 'cookie',
			keyPattern: new RegExp('^merchello$', 'i'),
			description: 'Cookie name matches a known technology marker.',
		},
	],
	implies: [
		'umbraco',
	],
	metadata: {
		saas: true,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
