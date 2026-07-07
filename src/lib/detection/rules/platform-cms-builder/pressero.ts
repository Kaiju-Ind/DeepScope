import type { TechnologyDefinition } from '../../types';

export const presseroTechnologyDefinition = {
	id: "pressero",
	name: "Pressero",
	website: "https://www.aleyant.com/pressero",
	description: "Pressero is a web-to-print storefront platform that allows businesses to offer customizable print products, manage orders, and streamline the printing process through an online interface.",
	icon: "Pressero.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pressero:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Pressero$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "pressero:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^pressero$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
