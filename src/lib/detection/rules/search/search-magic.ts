import type { TechnologyDefinition } from '../../types';

export const searchMagicTechnologyDefinition = {
	id: "search-magic",
	name: "Search Magic",
	website: "https://yourstorewizards.com/app-store/search-magic",
	description: "Search Magic is an ecommerce website search solution designed to improve product discovery and enhance user experience through advanced search capabilities.",
	icon: "SearchMagic.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "search-magic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.searchmagic\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "search-magic:jsGlobal:1",
			kind: "jsGlobal",
			property: "yswSearchMagicCssUrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
