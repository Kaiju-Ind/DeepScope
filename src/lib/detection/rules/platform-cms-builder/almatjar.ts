import type { TechnologyDefinition } from '../../types';

export const almatjarTechnologyDefinition = {
	id: "almatjar",
	name: "AlMatjar",
	website: "https://almatjar.store",
	description: "AlMatjar is an online store builder designed to help users create and manage ecommerce websites.",
	icon: "AlMatjar.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "almatjar:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^AlMatjar.store ECommerce Builder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "almatjar:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^almatjar.store ecommerce builder$", "i"),
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
