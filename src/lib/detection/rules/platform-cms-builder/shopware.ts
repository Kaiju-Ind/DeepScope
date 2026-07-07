import type { TechnologyDefinition } from '../../types';

export const shopwareTechnologyDefinition = {
	id: "shopware",
	name: "Shopware",
	website: "https://www.shopware.com",
	description: "Shopware is an enterprise-level ecommerce platform.",
	icon: "Shopware.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopware:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:(shopware)|\\/web\\/cache\\/[0-9]{10}_.+)\\.js"),
			version: {
				source: "match",
				template: "$1?4:5",
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shopware:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jquery\\.shopware\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shopware:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/engine\\/Shopware\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shopware:html:3",
			kind: "html",
			pattern: new RegExp("<title>Shopware ([\\d\\.]+) [^<]+"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "shopware:jsGlobal:4",
			kind: "jsGlobal",
			property: "shopStudioGoogleTagManagerCloudGtagCallback",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopware:header:5",
			kind: "header",
			key: "sw-context-token",
			valuePattern: new RegExp("^[\\w]{32}$", "i"),
			version: {
				source: "match",
				template: "6",
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "shopware:header:6",
			kind: "header",
			key: "sw-language-id",
			valuePattern: new RegExp("^[a-fA-F0-9]{32}$", "i"),
			version: {
				source: "match",
				template: "6",
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "shopware:meta:7",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("Shopware", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "shopware:scriptContent:8",
			kind: "scriptContent",
			pattern: new RegExp("window\\.features[^;]*V6_5_0_0.{0,15}true[^;]*V6_6_0_0.{0,15}false"),
			version: {
				source: "match",
				template: "6.5",
			},
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "shopware:scriptContent:9",
			kind: "scriptContent",
			pattern: new RegExp("window\\.features[^;]*V6_6_0_0.{0,15}true[^;]*V6_7_0_0.{0,15}false"),
			version: {
				source: "match",
				template: "6.6",
			},
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "shopware:scriptContent:10",
			kind: "scriptContent",
			pattern: new RegExp("window\\.features[^;]*V6_7_0_0.{0,15}true[^;]*V6_8_0_0.{0,15}false"),
			version: {
				source: "match",
				template: "6.7",
			},
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "shopware:scriptContent:11",
			kind: "scriptContent",
			pattern: new RegExp("window\\.features[^;]*V6_8_0_0.{0,15}true[^;]*V6_9_0_0.{0,15}false"),
			version: {
				source: "match",
				template: "6.8",
			},
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "shopware:dom:12",
			kind: "dom",
			selector: "input[name*='shopware_'], script[data-plugin-version^='Shopware']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "shopware:jsGlobal:13",
			kind: "jsGlobal",
			property: "_shopwareAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopware:jsGlobal:14",
			kind: "jsGlobal",
			property: "mollie_javascript_use_shopware",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopware:jsGlobal:15",
			kind: "jsGlobal",
			property: "shopwareAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopware:scriptSrc:16",
			kind: "scriptSrc",
			pattern: new RegExp("\\/engine\\/shopware\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shopware:html:17",
			kind: "html",
			pattern: new RegExp("<title>shopware ([\\d\\.]+) [^<]+"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "shopware:header:18",
			kind: "header",
			key: "sw-language-id",
			valuePattern: new RegExp("^[a-fa-f0-9]{32}$", "i"),
			version: {
				source: "match",
				template: "6",
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "shopware:meta:19",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("shopware", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:shopware:shopware:*:*:*:*:*:*:*:*",
	},
	implies: [
		"jquery",
		"mysql",
		"php",
		"symfony",
	],
} as const satisfies TechnologyDefinition;
