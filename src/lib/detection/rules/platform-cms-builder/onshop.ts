import type { TechnologyDefinition } from '../../types';

export const onshopTechnologyDefinition = {
	id: "onshop",
	name: "OnShop",
	website: "https://onshop.asia",
	description: "OnShop is an ecommerce platform for online merchants.",
	icon: "Onshop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "onshop:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.onshop.asia/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "onshop:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Onshop Ecommerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "onshop:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("onshop ecommerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"php",
	],
	excludes: [
		"opencart",
	],
} as const satisfies TechnologyDefinition;
