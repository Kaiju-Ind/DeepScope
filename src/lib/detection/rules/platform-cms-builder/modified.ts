import type { TechnologyDefinition } from '../../types';

export const modifiedTechnologyDefinition = {
	id: "modified",
	name: "Modified",
	website: "https://www.modified-shop.org/",
	icon: "modified.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "modified:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("\\(c\\) by modified eCommerce Shopsoftware ------ http:\\/\\/www\\.modified-shop\\.org", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "modified:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("\\(c\\) by modified ecommerce shopsoftware ------ http:\\/\\/www\\.modified-shop\\.org", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
