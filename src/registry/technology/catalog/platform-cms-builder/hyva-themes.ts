import type { TechnologyDefinition } from '@/lib/detection/types';

export const hyvaThemesTechnologyDefinition: TechnologyDefinition = {
	id: 'hyva-themes',
	name: 'Hyva Themes',
	website: 'https://hyva.io',
	description:
		'Hyva Themes is a performance-optimised theme for Magento 2 which eliminated the third-party libraries and having only two dependencies Alpine.js and Tailwind CSS.',
	icon: 'Hyva Themes.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'hyva-themes:header:0',
			kind: 'header',
			key: 'X-Built-With',
			valuePattern: new RegExp('^Hyva Themes$', 'i'),
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'hyva-themes:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'hyva',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'hyva-themes:header:2',
			kind: 'header',
			key: 'x-built-with',
			valuePattern: new RegExp('^hyva themes$', 'i'),
			description: 'Response header matches a known technology marker.',
		},
	],
	component: {
		kind: 'theme',
		parentTechnologyId: 'magento',
		vendor: 'Hyvä',
		sourceIdentities: [{ kind: 'marketplace-listing', value: 'hyva-themes', url: 'https://hyva.io/' }],
		features: ['storefront-theme', 'alpine-js-storefront', 'tailwind-css-storefront'],
		integrations: [{ kind: 'extends', target: 'magento' }],
	},
	versioning: { scheme: 'semver' },
	metadata: {
		pricing: [
			'low',
			'onetime',
		],
	},
	implies: [
		'alpine-js',
		'magento',
		'tailwind-css',
	],
} as const satisfies TechnologyDefinition;
