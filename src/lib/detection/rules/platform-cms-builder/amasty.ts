import type { TechnologyDefinition } from '../../types';

export const amastyTechnologyDefinition: TechnologyDefinition = {
	id: 'amasty',
	name: 'Amasty',
	website: 'https://amasty.com',
	description: 'Amasty is a developer of modules for Magento platforms.',
	icon: 'Amasty.svg',
	categories: [
		'ecommerce-extensions',
	],
	rules: [
		{
			id: 'amasty:header:0',
			kind: 'header',
			key: 'Content-Security-Policy',
			valuePattern: new RegExp('amasty\\.com', 'i'),
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'amasty:header:1',
			kind: 'header',
			key: 'Content-Security-Policy-Report-Only',
			valuePattern: new RegExp('amasty\\.com', 'i'),
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'amasty:header:2',
			kind: 'header',
			key: 'content-security-policy',
			valuePattern: new RegExp('amasty\\.com', 'i'),
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'amasty:header:3',
			kind: 'header',
			key: 'content-security-policy-report-only',
			valuePattern: new RegExp('amasty\\.com', 'i'),
			description: 'Response header matches a known technology marker.',
		},
	],
	component: {
		kind: 'feature-provider',
		parentTechnologyId: 'magento',
		vendor: 'Amasty',
		sourceIdentities: [{ kind: 'marketplace-listing', value: 'amasty', url: 'https://amasty.com/' }],
		features: ['extension-vendor'],
		integrations: [{ kind: 'integrates-with', target: 'magento' }],
	},
	versioning: {
		enabled: false,
		reason: 'The detector identifies the Amasty vendor suite, not one versioned extension package.',
	},
	metadata: {
		saas: true,
	},
	requires: [
		'magento',
	],
} as const satisfies TechnologyDefinition;
