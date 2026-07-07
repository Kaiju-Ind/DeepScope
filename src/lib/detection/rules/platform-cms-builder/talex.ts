import type { TechnologyDefinition } from '../../types';

export const talexTechnologyDefinition = {
	id: "talex",
	name: "Talex",
	website: "https://www.talex.se",
	description: "Talex is a Swedish ecommerce platform.",
	icon: "Talex.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "talex:meta:0",
			kind: "meta",
			key: "Author",
			valuePattern: new RegExp("Talex Webshop,", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "talex:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("talex webshop,", "i"),
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
