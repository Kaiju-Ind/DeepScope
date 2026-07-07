import type { TechnologyDefinition } from '../../types';

export const dalueTechnologyDefinition = {
	id: "dalue",
	name: "Dalue",
	website: "https://dalue.io/dalue",
	description: "Dalue is a cloud-based search engine developed in South Korea that enables information retrieval and indexing across online data sources.",
	icon: "Dalue.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "dalue:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.dalue\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dalue:jsGlobal:1",
			kind: "jsGlobal",
			property: "DalueSearch.Consts",
			description: "Page-owned global matches a known technology marker.",
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
