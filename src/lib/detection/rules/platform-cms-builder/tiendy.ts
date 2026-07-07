import type { TechnologyDefinition } from '../../types';

export const tiendyTechnologyDefinition = {
	id: "tiendy",
	name: "Tiendy",
	website: "https://www.tiendy.com",
	description: "Tiendy is an online platform for creating virtual shops, enabling businesses to design and manage digital storefronts.",
	icon: "Tiendy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tiendy:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Tiendy\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tiendy:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("tiendy\\.com", "i"),
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
} as const satisfies TechnologyDefinition;
