import type { TechnologyDefinition } from '../../types';

export const xCartTechnologyDefinition = {
	id: "x-cart",
	name: "X-Cart",
	website: "https://kb.x-cart.com",
	description: "X-Cart is an open source PHP shopping cart ecommerce software platform.",
	icon: "X-Cart.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "x-cart:jsGlobal:0",
			kind: "jsGlobal",
			property: "xcart_web_dir",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "x-cart:jsGlobal:1",
			kind: "jsGlobal",
			property: "xliteConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "x-cart:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("X-Cart(?: (\\d+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "x-cart:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("x-cart(?: (\\d+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:qualiteam:x-cart:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
