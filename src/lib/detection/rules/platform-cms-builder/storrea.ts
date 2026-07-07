import type { TechnologyDefinition } from '../../types';

export const storreaTechnologyDefinition = {
	id: "storrea",
	name: "Storrea",
	website: "https://www.storrea.com",
	description: "Storrea is a unified ecommerce platform that enables retailers to sell, manage, and sync online and in-store operations from a single dashboard.",
	icon: "Storrea.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "storrea:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Storrea$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "storrea:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^storrea$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
