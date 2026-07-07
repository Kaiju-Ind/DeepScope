import type { TechnologyDefinition } from '../../types';

export const shoppubTechnologyDefinition = {
	id: "shoppub",
	name: "Shoppub",
	website: "https://www.shoppub.com.br",
	description: "Shoppub is an ecommerce platform that focuses on implementing advanced business rules.",
	icon: "Shoppub.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoppub:jsGlobal:0",
			kind: "jsGlobal",
			property: "Shoppub.store",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shoppub:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Shoppub$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "shoppub:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^shoppub$", "i"),
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
