import type { TechnologyDefinition } from '../../types';

export const prestashopTechnologyDefinition: TechnologyDefinition = {
	id: 'prestashop',
	name: 'PrestaShop',
	website: 'https://www.prestashop.com',
	description:
		'PrestaShop is a freemium, open-source ecommerce solution, written in the PHP programming language with support for the MySQL database management system.',
	icon: 'PrestaShop.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'prestashop:html:0',
			kind: 'html',
			pattern: new RegExp('Powered by <a\\s+[^>]+>PrestaShop', 'i'),
			description: 'HTML contains a known technology signature.',
		},
		{
			id: 'prestashop:dom:3',
			kind: 'dom',
			selector: "img[src*='/modules/prestablog/themes/'], img[data-src*='/modules/prestablog/themes/']",
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'prestashop:jsGlobal:4',
			kind: 'jsGlobal',
			property: 'freeProductTranslation',
			confidence: 40,
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'prestashop:jsGlobal:5',
			kind: 'jsGlobal',
			property: 'prestashop',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'prestashop:jsGlobal:6',
			kind: 'jsGlobal',
			property: 'priceDisplayMethod',
			confidence: 40,
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'prestashop:jsGlobal:7',
			kind: 'jsGlobal',
			property: 'priceDisplayPrecision',
			confidence: 40,
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'prestashop:jsGlobal:8',
			kind: 'jsGlobal',
			property: 'rcAnalyticsEvents.eventPrestashopCheckout',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'prestashop:cookie:9',
			kind: 'cookie',
			keyPattern: new RegExp('^PrestaShop$', 'i'),
			description: 'Cookie name matches a known technology marker.',
		},
		{
			id: 'prestashop:header:10',
			kind: 'header',
			key: 'Powered-By',
			valuePattern: new RegExp('^Prestashop$', 'i'),
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'prestashop:meta:11',
			kind: 'meta',
			key: 'generator',
			valuePattern: new RegExp('PrestaShop', 'i'),
			description: 'Meta tag matches a known technology marker.',
		},
		{
			id: 'prestashop:scriptSrc:12',
			kind: 'scriptSrc',
			confidence: 35,
			pattern: new RegExp('\\/modules\\/ps_[a-z]+\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'prestashop:scriptContent:13',
			kind: 'scriptContent',
			pattern: new RegExp('PrestaShop-'),
			description: 'Script content contains a bounded technology signature.',
		},
		{
			id: 'prestashop:dom:14',
			kind: 'dom',
			confidence: 35,
			selector: "link[href*='/modules/ps_']",
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'prestashop:html:15',
			kind: 'html',
			pattern: new RegExp('<!-- (?:\\/)?MODULE [^|]+ \\|\\| Presta-Module\\.com -->', 'i'),
			description: 'HTML contains a known technology signature.',
		},
	],
	metadata: {
		oss: true,
		cpe: 'cpe:2.3:a:prestashop:prestashop:*:*:*:*:*:*:*:*',
	},
	implies: [
		'mysql',
		'php',
	],
} as const satisfies TechnologyDefinition;
