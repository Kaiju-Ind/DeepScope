import type { TechnologyDefinition } from '@/lib/detection/types';

export const elasticsuiteTechnologyDefinition: TechnologyDefinition = {
	id: 'elasticsuite',
	name: 'ElasticSuite',
	website: 'https://elasticsuite.io',
	description: 'ElasticSuite is a merchandising suite for Magento and OroCommerce.',
	icon: 'ElasticSuite.svg',
	categories: [
		'search',
	],
	rules: [
		{
			id: 'elasticsuite:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/Smile_ElasticsuiteTracker\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'elasticsuite:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'smileTracker',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'elasticsuite:cookie:2',
			kind: 'cookie',
			keyPattern: new RegExp('^STUID$', 'i'),
			confidence: 50,
			description: 'Cookie name matches a known technology marker.',
		},
		{
			id: 'elasticsuite:cookie:3',
			kind: 'cookie',
			keyPattern: new RegExp('^STVID$', 'i'),
			confidence: 50,
			description: 'Cookie name matches a known technology marker.',
		},
		{
			id: 'elasticsuite:scriptContent:4',
			kind: 'scriptContent',
			pattern: new RegExp('(?:\\.elasticsuite\\.io\\/|\\/elasticsuite-tracker\\/)'),
			description: 'Script content contains a bounded technology signature.',
		},
		{
			id: 'elasticsuite:scriptSrc:5',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/smile_elasticsuitetracker\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'elasticsuite:cookie:6',
			kind: 'cookie',
			keyPattern: new RegExp('^stuid$', 'i'),
			confidence: 50,
			description: 'Cookie name matches a known technology marker.',
		},
		{
			id: 'elasticsuite:cookie:7',
			kind: 'cookie',
			keyPattern: new RegExp('^stvid$', 'i'),
			confidence: 50,
			description: 'Cookie name matches a known technology marker.',
		},
		{
			id: 'elasticsuite:scriptContent:8',
			kind: 'scriptContent',
			pattern: new RegExp('\\.elasticsuite\\.io\\/|\\/elasticsuite-tracker\\/|Lmc_ElasticSuiteCatalog\\\\'),
			description: 'Script content contains a bounded technology signature.',
		},
	],
	component: {
		kind: 'extension',
		parentTechnologyId: 'magento',
		vendor: 'Smile',
		sourceIdentities: [
			{ kind: 'composer-package', value: 'smile/elasticsuite' },
			{ kind: 'repository', value: 'Smile-SA/elasticsuite', url: 'https://github.com/Smile-SA/elasticsuite' },
		],
		features: ['catalog-search', 'merchandising'],
		integrations: [
			{ kind: 'extends', target: 'magento' },
			{ kind: 'connects-to', target: 'elasticsearch' },
		],
	},
	versioning: { scheme: 'numeric-dotted' },
	metadata: {
		oss: true,
		pricing: [
			'poa',
		],
	},
	implies: [
		'elasticsearch',
		'php',
	],
	requires: [
		'magento',
		'orocommerce',
	],
} as const satisfies TechnologyDefinition;
