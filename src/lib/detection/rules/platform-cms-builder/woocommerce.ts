import type { TechnologyDefinition } from '../../types';

export const woocommerceTechnologyDefinition = {
	id: "woocommerce",
	name: "WooCommerce",
	website: "https://woocommerce.com",
	description: "WooCommerce is an open-source WordPress plugin for managing products, carts, checkout, and online orders.",
	icon: "WooCommerce.svg",
	categories: [
		"platform-cms-builder",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "woocommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("/wp-content/plugins/woocommerce/", "i"),
			confidence: 100,
			description: "Script URL is served from the WooCommerce WordPress plugin directory.",
		},
		{
			id: "woocommerce:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("/wp-content/plugins/woocommerce/[^?#\\s\"']+[?&]ver=([0-9.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Versioned script URL is served from the WooCommerce WordPress plugin directory.",
		},
		{
			id: "woocommerce:dom:2",
			kind: "dom",
			selector: ".woocommerce, .woocommerce-no-js, link[rel*='woocommerce']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "woocommerce:jsGlobal:3",
			kind: "jsGlobal",
			property: "woocommerce_params",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "woocommerce:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("WooCommerce ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "woocommerce:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("/wp-content/plugins/woocommerce/", "i"),
			confidence: 100,
			description: "Script URL is served from the WooCommerce WordPress plugin directory.",
		},
		{
			id: "woocommerce:scriptSrc:6",
			kind: "scriptSrc",
			pattern: new RegExp("/wp-content/plugins/woocommerce/[^?#\\s\"']+[?&]ver=([0-9.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Versioned script URL is served from the WooCommerce WordPress plugin directory.",
		},
		{
			id: "woocommerce:jsGlobal:7",
			kind: "jsGlobal",
			property: "wc_add_to_cart_params",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "woocommerce:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^woocommerce_recently_viewed$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "woocommerce:meta:9",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("woocommerce ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:woocommerce:woocommerce:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
