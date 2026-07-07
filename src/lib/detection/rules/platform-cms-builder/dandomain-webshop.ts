import type { TechnologyDefinition } from '../../types';

export const dandomainWebshopTechnologyDefinition = {
	id: "dandomain-webshop",
	name: "DanDomain Webshop",
	website: "https://dandomain.dk/webshop",
	description: "DanDomain Webshop is a Danish ecommerce platform provided by DanDomain, offering businesses the tools to create and manage their online stores.",
	icon: "DanDomain.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dandomain-webshop:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^DanDomain\\sWebshop$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "dandomain-webshop:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^dandomain\\swebshop$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
