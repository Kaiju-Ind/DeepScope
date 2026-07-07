import type { TechnologyDefinition } from '../../types';

export const shopfaTechnologyDefinition = {
	id: "shopfa",
	name: "Shopfa",
	website: "https://shopfa.com",
	icon: "Shopfa.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopfa:jsGlobal:0",
			kind: "jsGlobal",
			property: "shopfa",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopfa:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^ShopFA ([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "shopfa:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^ShopFA ([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "shopfa:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^shopfa ([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "shopfa:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^shopfa ([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
