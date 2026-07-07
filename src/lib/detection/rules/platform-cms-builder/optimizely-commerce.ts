import type { TechnologyDefinition } from '../../types';

export const optimizelyCommerceTechnologyDefinition = {
	id: "optimizely-commerce",
	name: "Optimizely Commerce",
	website: "https://www.optimizely.com/products/commerce/b2c/",
	description: "Optimizely Commerce is a complete suite for digital ecommerce and content management that uses artificial intelligence to deliver personalised experiences, individualised search rankings and product recommendations.",
	icon: "Optimizely.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "optimizely-commerce:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^EPi:StateMarker$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "optimizely-commerce:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("EPiServer", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "optimizely-commerce:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^epi:statemarker$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "optimizely-commerce:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("episerver", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
