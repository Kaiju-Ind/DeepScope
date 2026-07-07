import type { TechnologyDefinition } from '../../types';

export const upgatesTechnologyDefinition = {
	id: "upgates",
	name: "Upgates",
	website: "https://www.upgates.com",
	description: "Upgates is a subscription-based ecommerce software used to build eshops.",
	icon: "Upgates.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "upgates:jsGlobal:0",
			kind: "jsGlobal",
			property: "upgates",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "upgates:meta:1",
			kind: "meta",
			key: "web_author",
			valuePattern: new RegExp("^UPgates$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "upgates:meta:2",
			kind: "meta",
			key: "web_author",
			valuePattern: new RegExp("^upgates$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
