import type { TechnologyDefinition } from '../../types';

export const convertrTechnologyDefinition = {
	id: "convertr",
	name: "Convertr",
	website: "https://convertr.com.br",
	description: "Convertr is a Brazilian ecommerce platform, fashion specialist.",
	icon: "Convertr.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "convertr:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Convertr Commerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "convertr:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^convertr commerce$", "i"),
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
		"amazon-web-services",
		"mysql",
		"nuxt-js",
		"php",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
