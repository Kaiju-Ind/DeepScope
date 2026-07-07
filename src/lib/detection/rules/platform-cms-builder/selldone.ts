import type { TechnologyDefinition } from '../../types';

export const selldoneTechnologyDefinition = {
	id: "selldone",
	name: "Selldone",
	website: "https://selldone.com",
	description: "Selldone is an all-in-one, ready-to-use ecommerce platform.",
	icon: "Selldone.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "selldone:jsGlobal:0",
			kind: "jsGlobal",
			property: "webpackChunkselldone",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
	implies: [
		"php",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
