import type { TechnologyDefinition } from '../../types';

export const remarkableCommerceTechnologyDefinition = {
	id: "remarkable-commerce",
	name: "Remarkable Commerce",
	website: "https://remarkable.net/",
	description: "Remarkable Commerce is a technology and services company which provides an ecommerce platform for mid-sized retailers.",
	icon: "Remarkable.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "remarkable-commerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "Remarkable.BasketItems",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "remarkable-commerce:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("Remarkable Commerce", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
