import type { TechnologyDefinition } from '../../types';

export const soocommerceTechnologyDefinition = {
	id: "soocommerce",
	name: "Soocommerce",
	website: "https://soocommerce.com/",
	description: "Soocommerce is a platform specialized in ecommerce software development.",
	icon: "Soocommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "soocommerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "sessionStorage.firmName",
			valuePattern: new RegExp("soocommerce"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "soocommerce:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Soocommerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "soocommerce:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("soocommerce", "i"),
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
