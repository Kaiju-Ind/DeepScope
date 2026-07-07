import type { TechnologyDefinition } from '../../types';

export const magentoTechnologyDefinition = {
	id: "magento",
	name: "Magento",
	website: "https://magento.com",
	description: "Magento is a PHP-based ecommerce platform, now offered commercially as Adobe Commerce.",
	icon: "Magento.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "magento:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/mage"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "magento:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("skin\\/frontend\\/(?:default|(enterprise))"),
			version: {
				source: "match",
				template: "$1?1 (Enterprise):1 (Community)",
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "magento:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("skin\\/frontend\\/"),
			confidence: 50,
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "magento:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("static\\/_requirejs"),
			confidence: 50,
			version: {
				source: "match",
				template: "2",
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "magento:dom:4",
			kind: "dom",
			selector: "script[data-requiremodule*='mage/'], script[data-requiremodule*='Magento_'], html[data-image-optimizing-origin]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "magento:dom:5",
			kind: "dom",
			selector: "script[type='text/x-magento-init']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "magento:jsGlobal:6",
			kind: "jsGlobal",
			property: "Mage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "magento:jsGlobal:7",
			kind: "jsGlobal",
			property: "VarienForm",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "magento:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^X\\-Magento\\-Vary$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "magento:cookie:9",
			kind: "cookie",
			keyPattern: new RegExp("^frontend$", "i"),
			confidence: 50,
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "magento:cookie:10",
			kind: "cookie",
			keyPattern: new RegExp("^mage\\-cache\\-storage$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "magento:cookie:11",
			kind: "cookie",
			keyPattern: new RegExp("^mage\\-cache\\-storage\\-section\\-invalidation$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "magento:cookie:12",
			kind: "cookie",
			keyPattern: new RegExp("^mage\\-translation\\-file\\-version$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "magento:cookie:13",
			kind: "cookie",
			keyPattern: new RegExp("^mage\\-translation\\-storage$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "magento:cookie:14",
			kind: "cookie",
			keyPattern: new RegExp("^x\\-magento\\-vary$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "magento:script-content:15",
			kind: "scriptContent",
			pattern: /\bMagento_[A-Z][A-Za-z0-9_]+\/js\//,
			description: "Script content references Magento module JavaScript paths.",
		},
		{
			id: "magento:html:16",
			kind: "html",
			pattern: /data-mage-init|text\/x-magento-init/i,
			description: "HTML contains Magento frontend initialization markers.",
		}
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:magento:magento:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
