import type { TechnologyDefinition } from '../../types';

export const poskiTechnologyDefinition = {
	id: "poski",
	name: "Poski",
	website: "https://www.poski.com",
	description: "Poski is an ecommerce platform that enables businesses to sell products and manage transactions through a digital storefront.",
	icon: "Poski.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "poski:jsGlobal:0",
			kind: "jsGlobal",
			property: "poskiLangPath",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "poski:jsGlobal:1",
			kind: "jsGlobal",
			property: "poskiLocale",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "poski:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Poski\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "poski:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("poski\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
