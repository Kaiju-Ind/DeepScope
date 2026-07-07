import type { TechnologyDefinition } from '../../types';

export const oxyshopTechnologyDefinition = {
	id: "oxyshop",
	name: "oXyShop",
	website: "https://www.oxyshop.cz",
	description: "oXyShop is a platform for creating and managing online stores.",
	icon: "OxyShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "oxyshop:meta:0",
			kind: "meta",
			key: "web_author",
			valuePattern: new RegExp("^oXyShop$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "oxyshop:meta:1",
			kind: "meta",
			key: "web_author",
			valuePattern: new RegExp("^oxyshop$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
