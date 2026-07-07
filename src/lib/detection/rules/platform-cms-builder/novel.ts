import type { TechnologyDefinition } from '../../types';

export const novelTechnologyDefinition = {
	id: "novel",
	name: "Novel",
	website: "https://www.novel.com",
	description: "Novel is a platform that allows users to drop NFTs and set up token-gated products, content, and discounts within minutes.",
	icon: "Novel.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "novel:jsGlobal:0",
			kind: "jsGlobal",
			property: "__NOVEL_STOREFRONT_SCRIPT_HAS_RUN__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "novel:jsGlobal:1",
			kind: "jsGlobal",
			property: "__novel_cache__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "novel:jsGlobal:2",
			kind: "jsGlobal",
			property: "fetchNovelSession",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "novel:jsGlobal:3",
			kind: "jsGlobal",
			property: "fetchNovelStorefrontData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
