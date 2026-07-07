import type { TechnologyDefinition } from '../../types';

export const meilisearchTechnologyDefinition = {
	id: "meilisearch",
	name: "Meilisearch",
	website: "https://www.meilisearch.com",
	description: "Meilisearch is a search engine created by Meili, a software development company based in France.",
	icon: "Meilisearch.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "meilisearch:dom:0",
			kind: "dom",
			selector: "span.meilisearch-autocomplete",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "meilisearch:jsGlobal:1",
			kind: "jsGlobal",
			property: "MeiliSearch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "meilisearch:jsGlobal:2",
			kind: "jsGlobal",
			property: "MeiliSearchApiError",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "meilisearch:jsGlobal:3",
			kind: "jsGlobal",
			property: "MeiliSearchTimeOutError",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "meilisearch:jsGlobal:4",
			kind: "jsGlobal",
			property: "ac_apsulis_meilisearch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "meilisearch:jsGlobal:5",
			kind: "jsGlobal",
			property: "instantMeiliSearch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "meilisearch:scriptContent:6",
			kind: "scriptContent",
			pattern: new RegExp("\\.meilisearch\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "meilisearch:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^saas_demo_meilisearch_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
