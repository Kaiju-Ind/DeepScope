import type { TechnologyDefinition } from '../../types';

export const zoyeqTechnologyDefinition = {
	id: "zoyeq",
	name: "ZOYEQ",
	website: "https://www.zoyeq.com",
	description: "ZOYEQ is a cloud ecommerce platform for building and managing online stores, orders, inventory, and point-of-sale operations.",
	icon: "ZOYEQ.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zoyeq:jsGlobal:0",
			kind: "jsGlobal",
			property: "ZOYEQ",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zoyeq:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^ZOYEQ$", "i"),
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
