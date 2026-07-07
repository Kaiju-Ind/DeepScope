import type { TechnologyDefinition } from '../../types';

export const technology2clickshopTechnologyDefinition = {
	id: "2clickshop",
	name: "2ClickShop",
	website: "https://2click.pl",
	description: "2ClickShop is an ecommerce platform integrated with ERP systems, catering to both B2B and B2C transactions.",
	icon: "2ClickShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "2clickshop:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Trol Intermedia \\/ 2ClickShop$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "2clickshop:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^trol intermedia \\/ 2clickshop$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
