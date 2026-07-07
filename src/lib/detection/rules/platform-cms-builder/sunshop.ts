import type { TechnologyDefinition } from '../../types';

export const sunshopTechnologyDefinition = {
	id: "sunshop",
	name: "Sunshop",
	website: "https://www.sunshop.com",
	description: "Sunshop is an ecommerce software that provides tools for online store setup and administration.",
	icon: "Sunshop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sunshop:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("www\\.sunshop\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
