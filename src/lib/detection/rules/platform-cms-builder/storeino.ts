import type { TechnologyDefinition } from '../../types';

export const storeinoTechnologyDefinition = {
	id: "storeino",
	name: "Storeino",
	website: "https://www.storeino.com",
	description: "Storeino is an ecommerce platform that enables businesses and physical store owners to open a professional online store and sell products online regardless of their geographical location.",
	icon: "Storeino.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "storeino:jsGlobal:0",
			kind: "jsGlobal",
			property: "StoreinoApp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "storeino:meta:1",
			kind: "meta",
			key: "platform",
			valuePattern: new RegExp("^Storeino$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "storeino:meta:2",
			kind: "meta",
			key: "platform",
			valuePattern: new RegExp("^storeino$", "i"),
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
	implies: [
		"express",
		"mongodb",
		"node-js",
	],
} as const satisfies TechnologyDefinition;
