import type { TechnologyDefinition } from '../../types';

export const andcommerceTechnologyDefinition = {
	id: "andcommerce",
	name: "ANDCommerce",
	website: "https://www.andcommerce.com.br/",
	description: "ANDCommerce is an ecommerce platform for building and operating online stores.",
	icon: "ANDCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "andcommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/extension_andcommerce\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "andcommerce:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/andcommerce(?:scriptcontent|scriptlayout)_"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "andcommerce:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^ANDCommerce$", "i"),
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
