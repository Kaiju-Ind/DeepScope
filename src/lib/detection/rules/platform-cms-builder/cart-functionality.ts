import type { TechnologyDefinition } from '../../types';

export const cartFunctionalityTechnologyDefinition = {
	id: "cart-functionality",
	name: "Cart Functionality",
	website: "#",
	description: "Websites that have a shopping cart or checkout page, either using a known ecommerce platform or a custom solution.",
	icon: "Cart-generic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cart-functionality:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("googlecommerce\\.com\\/trustedstores\\/api\\/js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cart-functionality:url:1",
			kind: "url",
			pattern: new RegExp("\\/(?:cart|order|basket|trolley|bag|shoppingbag|checkout)"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "cart-functionality:dom:2",
			kind: "dom",
			selector: "a[href*='/cart']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-functionality:dom:3",
			kind: "dom",
			selector: "a[href*='/order']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-functionality:dom:4",
			kind: "dom",
			selector: "a[href*='/basket']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-functionality:dom:5",
			kind: "dom",
			selector: "a[href*='/trolley']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-functionality:dom:6",
			kind: "dom",
			selector: "a[href*='/bag/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-functionality:dom:7",
			kind: "dom",
			selector: "a[href*='/shoppingbag']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-functionality:dom:8",
			kind: "dom",
			selector: "a[href*='/checkout']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-functionality:dom:9",
			kind: "dom",
			selector: "a[href*='/winkelwagen']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-functionality:dom:10",
			kind: "dom",
			selector: "[aria-controls='cart']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-functionality:dom:11",
			kind: "dom",
			selector: "[class*='shopping-bag']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-functionality:dom:12",
			kind: "dom",
			selector: "[class*='shopping-cart']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-functionality:dom:13",
			kind: "dom",
			selector: "[class*='checkout']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-functionality:dom:14",
			kind: "dom",
			selector: "[class*='winkelwagen']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-functionality:jsGlobal:15",
			kind: "jsGlobal",
			property: "google_tag_params.ecomm_pagetype",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
