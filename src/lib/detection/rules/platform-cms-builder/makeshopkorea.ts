import type { TechnologyDefinition } from '../../types';

export const makeshopkoreaTechnologyDefinition = {
	id: "makeshopkorea",
	name: "MakeShopKorea",
	website: "https://www.makeshop.co.kr",
	description: "MakeShopKorea is a Korean hosting brand that focuses on building ecommerce stores.",
	icon: "MakeShopKorea.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "makeshopkorea:jsGlobal:0",
			kind: "jsGlobal",
			property: "Makeshop",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "makeshopkorea:jsGlobal:1",
			kind: "jsGlobal",
			property: "MakeshopLogUniqueId",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
