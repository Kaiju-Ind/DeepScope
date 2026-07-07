import type { TechnologyDefinition } from '../../types';

export const mintTechnologyDefinition = {
	id: "mint",
	name: "Mint",
	website: "https://haveamint.com",
	description: "Mint is an extensible, self-hosted web site analytics program.",
	icon: "Mint.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "mint:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mint\\/\\?js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mint:jsGlobal:1",
			kind: "jsGlobal",
			property: "Mint",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
