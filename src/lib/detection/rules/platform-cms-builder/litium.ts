import type { TechnologyDefinition } from '../../types';

export const litiumTechnologyDefinition = {
	id: "litium",
	name: "Litium",
	website: "https://www.litium.com",
	description: "Litium is a versatile ecommerce solution tailored for businesses aiming to enhance their online presence.",
	icon: "Litium.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "litium:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Litium$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "litium:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^litium$", "i"),
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
