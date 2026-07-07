import type { TechnologyDefinition } from '../../types';

export const squarespaceCommerceTechnologyDefinition = {
	id: "squarespace-commerce",
	name: "Squarespace Commerce",
	website: "https://www.squarespace.com/ecommerce-website",
	description: "Squarespace Commerce is an ecommerce platform designed to facilitate the creation of websites and online stores, with domain registration and web hosting included.",
	icon: "Squarespace.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "squarespace-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.squarespace\\.\\w+\\/universal\\/scripts-compressed\\/commerce-\\w+-min\\.[\\w+\\-]+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "squarespace-commerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "SQUARESPACE_ROLLUPS.squarespace-commerce",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "squarespace-commerce:jsGlobal:2",
			kind: "jsGlobal",
			property: "Static.SQUARESPACE_CONTEXT.templateVersion",
			valuePattern: new RegExp("^(\\d(?:\\.\\d)?)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "squarespace-commerce:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("Squarespace", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "squarespace-commerce:header:4",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("squarespace", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"squarespace",
	],
} as const satisfies TechnologyDefinition;
