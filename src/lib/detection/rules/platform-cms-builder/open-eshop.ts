import type { TechnologyDefinition } from '../../types';

export const openEshopTechnologyDefinition = {
	id: "open-eshop",
	name: "Open eShop",
	website: "https://open-eshop.com/",
	icon: "Open eShop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "open-eshop:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("open-eshop\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "open-eshop:meta:1",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("Open eShop ?([0-9.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "open-eshop:meta:2",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("open eshop ?([0-9.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
