import type { TechnologyDefinition } from '../../types';

export const t1PaginasTechnologyDefinition = {
	id: "t1-paginas",
	name: "T1 Paginas",
	website: "https://t1paginas.com",
	description: "T1 Paginas is an ecommerce platform.",
	icon: "T1 Paginas.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "t1-paginas:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^T1PAGINAS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "t1-paginas:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^t1paginas$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
	implies: [
		"angularjs",
		"mongodb",
		"node-js",
	],
} as const satisfies TechnologyDefinition;
