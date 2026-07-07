import type { TechnologyDefinition } from '../../types';

export const abicartTechnologyDefinition = {
	id: "abicart",
	name: "Abicart",
	website: "https://abicart.com/",
	description: "Abicart is an ecommerce platform developed by the Swedish company Abicart AB.",
	icon: "abicart.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "abicart:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Abicart", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "abicart:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Textalk Webshop", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "abicart:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("abicart", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "abicart:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("textalk webshop", "i"),
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
