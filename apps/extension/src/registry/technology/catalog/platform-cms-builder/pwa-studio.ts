import type { TechnologyDefinition } from '@/lib/detection/types';

export const pwaStudioTechnologyDefinition: TechnologyDefinition = {
	id: 'pwa-studio',
	name: 'PWA Studio',
	website: 'https://developer.adobe.com/commerce/pwa-studio/',
	description:
		'PWA Studio is a collection of tools that lets developers build complex Progressive Web Applications on top of Magento 2 or Adobe Commerce stores.',
	icon: 'PWA Studio.png',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'pwa-studio:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('RootCmp_CMS_PAGE'),
			description: 'Script content contains a bounded technology signature.',
		},
		{
			id: 'pwa-studio:jsGlobal:1',
			kind: 'jsGlobal',
			property: '__fetchLocaleData__',
			confidence: 50,
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'pwa-studio:jsGlobal:2',
			kind: 'jsGlobal',
			property: 'fetchRootComponent',
			confidence: 50,
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'pwa-studio:scriptContent:3',
			kind: 'scriptContent',
			pattern: new RegExp('rootcmp_cms_page'),
			description: 'Script content contains a bounded technology signature.',
		},
	],
	component: {
		kind: 'storefront',
		parentTechnologyId: 'magento',
		vendor: 'Adobe',
		sourceIdentities: [
			{ kind: 'repository', value: 'magento/pwa-studio', url: 'https://github.com/magento/pwa-studio' },
			{ kind: 'npm-package', value: '@magento/pwa-buildpack' },
		],
		features: ['headless-storefront', 'progressive-web-app'],
		integrations: [{ kind: 'extends', target: 'magento' }],
	},
	versioning: { scheme: 'semver' },
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
