import type { TechnologyDefinition } from '../../types';

export const syliusTechnologyDefinition = {
	id: "sylius",
	name: "Sylius",
	website: "https://sylius.com",
	description: "Sylius is an open-source ecommerce framework based on Symfony full stack.",
	icon: "Sylius.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sylius:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("syliusshop\\/script\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sylius:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("syliusgtmenhancedecommerceplugin"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sylius:dom:2",
			kind: "dom",
			selector: "body.sylius_homepage",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sylius:dom:3",
			kind: "dom",
			selector: "div#sylius-cart-button",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sylius:dom:4",
			kind: "dom",
			selector: "img[src*='sylius_shop_product_tiny_thumbnail']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sylius:dom:5",
			kind: "dom",
			selector: "div#sylius-locale-selector, body[class*='sylius_homepage'], div#sylius-cart-button, img[src*='sylius_shop_product_tiny_thumbnail'], input#sylius_add_to_cart_cartItem_variant",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sylius:jsGlobal:6",
			kind: "jsGlobal",
			property: "webpackChunkmonsieurbiz_sylius_toolbox_plugin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sylius:dom:7",
			kind: "dom",
			selector: "input#sylius_add_to_cart_cartItem_variant",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:sylius:sylius:*:*:*:*:*:*:*:*",
	},
	implies: [
		"symfony",
	],
} as const satisfies TechnologyDefinition;
