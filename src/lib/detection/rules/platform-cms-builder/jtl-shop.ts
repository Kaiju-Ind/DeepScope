import type { TechnologyDefinition } from '../../types';

export const jtlShopTechnologyDefinition = {
	id: "jtl-shop",
	name: "JTL Shop",
	website: "https://www.jtl-software.de/online-shopsystem",
	description: "JTL Shop is an ecommerce product created by JTL Software company.",
	icon: "JTL Shop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "jtl-shop:html:0",
			kind: "html",
			pattern: new RegExp("(?:<input[^>]+name=\"JTLSHOP|<a href=\"jtl\\.php)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "jtl-shop:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^JTLSHOP$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "jtl-shop:dom:2",
			kind: "dom",
			selector: "input[name*='JTLSHOP']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "jtl-shop:jsGlobal:3",
			kind: "jsGlobal",
			property: "JtlHelpers",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jtl-shop:html:4",
			kind: "html",
			pattern: new RegExp("(?:<input[^>]+name=\"jtlshop|<a href=\"jtl\\.php)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "jtl-shop:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^jtlshop$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
