import type { TechnologyDefinition } from '@/lib/detection/types';

export const breezeTechnologyDefinition: TechnologyDefinition = {
	id: 'breeze',
	name: 'Breeze',
	website: 'https://breezefront.com',
	description: 'Breeze is an open-source frontend framework designed for Magento.',
	icon: 'Breeze.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'breeze:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'breeze.getScopeId',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	component: {
		kind: 'storefront',
		parentTechnologyId: 'magento',
		vendor: 'Swissup Labs',
		sourceIdentities: [{ kind: 'marketplace-listing', value: 'breeze', url: 'https://breezefront.com/' }],
		features: ['storefront-framework'],
		integrations: [{ kind: 'extends', target: 'magento' }],
	},
	versioning: { scheme: 'semver' },
	metadata: {
		oss: true,
		pricing: [
			'freemium',
		],
	},
	requires: [
		'magento',
	],
} as const satisfies TechnologyDefinition;
