import type { TechnologyDefinition } from '../../types';

export const smartwebTechnologyDefinition = {
	id: "smartweb",
	name: "SmartWeb",
	website: "https://www.smartweb.dk",
	description: "SmartWeb is an ecommerce platform from Denmark.",
	icon: "SmartWeb.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "smartweb:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^SmartWeb$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "smartweb:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^smartweb$", "i"),
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
