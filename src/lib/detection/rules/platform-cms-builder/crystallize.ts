import type { TechnologyDefinition } from '../../types';

export const crystallizeTechnologyDefinition = {
	id: "crystallize",
	name: "Crystallize",
	website: "https://crystallize.com",
	description: "Crystallize is an ecommerce platform that offers a headless ecommerce solution for businesses.",
	icon: "Crystallize.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "crystallize:dom:0",
			kind: "dom",
			selector: "link[href*='.crystallize.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "crystallize:jsGlobal:1",
			kind: "jsGlobal",
			property: "__crystallizeConfig.API_URL",
			valuePattern: new RegExp("\\.crystallize\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
