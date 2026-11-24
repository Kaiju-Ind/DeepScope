import type { TechnologyDefinition } from '@/lib/detection/types';

export const mageOsTechnologyDefinition: TechnologyDefinition = {
	id: 'mage-os',
	name: 'Mage-OS',
	website: 'https://mage-os.org',
	description: 'Mage-OS is an independent, community-driven ecommerce platform built on Magento Open Source.',
	icon: 'Mage-OS.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'mage-os:header:0',
			kind: 'header',
			key: 'X-Dist',
			valuePattern: new RegExp('^Mage-OS$', 'i'),
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'mage-os:header:1',
			kind: 'header',
			key: 'x-dist',
			valuePattern: new RegExp('^mage-os$', 'i'),
			description: 'Response header matches a known technology marker.',
		},
	],
	component: {
		kind: 'distribution',
		parentTechnologyId: 'magento',
		vendor: 'Mage-OS Association',
		sourceIdentities: [{
			kind: 'repository',
			value: 'mage-os/mageos-magento2',
			url: 'https://github.com/mage-os/mageos-magento2',
		}],
		features: ['ecommerce-platform'],
		integrations: [{ kind: 'fork-of', target: 'magento' }],
	},
	versioning: { scheme: 'semver' },
	metadata: {
		oss: true,
	},
	implies: [
		'magento',
	],
} as const satisfies TechnologyDefinition;
