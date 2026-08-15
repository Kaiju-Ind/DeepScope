import type { TechnologyDefinition } from '../../types';

export const scandipwaTechnologyDefinition: TechnologyDefinition = {
	id: 'scandipwa',
	name: 'ScandiPWA',
	website: 'https://scandipwa.com',
	description: 'ScandiPWA is the next generation Magento 2 PWA theme developed in React.',
	icon: 'ScandiPWA.png',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'scandipwa:dom:0',
			kind: 'dom',
			selector: "link[href^='/static/frontend/scandipwa/']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	component: {
		kind: 'storefront',
		parentTechnologyId: 'magento',
		vendor: 'Scandiweb',
		sourceIdentities: [{
			kind: 'repository',
			value: 'scandipwa/scandipwa',
			url: 'https://github.com/scandipwa/scandipwa',
		}],
		features: ['headless-storefront', 'progressive-web-app', 'react-storefront'],
		integrations: [{ kind: 'extends', target: 'magento' }],
	},
	versioning: { scheme: 'semver' },
	metadata: {
		oss: true,
		cpe: 'cpe:2.3:a:scandipwa:magento-scripts:*:*:*:*:*:node.js:*:*',
	},
	implies: [
		'magento',
		'pwa',
		'react',
	],
} as const satisfies TechnologyDefinition;
