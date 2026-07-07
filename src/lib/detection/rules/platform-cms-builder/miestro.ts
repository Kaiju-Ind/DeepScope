import type { TechnologyDefinition } from '../../types';

export const miestroTechnologyDefinition = {
	id: "miestro",
	name: "Miestro",
	website: "https://miestro.com",
	description: "Miestro is an all-in-one ecommerce platform wich allow create online course and membership sites.",
	icon: "Miestro.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "miestro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.miestro\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "miestro:meta:1",
			kind: "meta",
			key: "base_url",
			valuePattern: new RegExp(".+\\.miestro\\.com", "i"),
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
