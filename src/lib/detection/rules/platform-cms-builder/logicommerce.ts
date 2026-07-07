import type { TechnologyDefinition } from '../../types';

export const logicommerceTechnologyDefinition = {
	id: "logicommerce",
	name: "LogiCommerce",
	website: "https://www.logicommerce.com",
	description: "LogiCommerce is the headless ecommerce platform.",
	icon: "LogiCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "logicommerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "logicommerceGlobal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "logicommerce:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^LogiCommerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "logicommerce:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^logicommerce$", "i"),
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
