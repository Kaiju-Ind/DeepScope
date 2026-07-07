import type { TechnologyDefinition } from '../../types';

export const hawksearchTechnologyDefinition = {
	id: "hawksearch",
	name: "HawkSearch",
	website: "https://www.hawksearch.com",
	description: "HawkSearch is a responsive ecommerce site search solution designed to enhance product discovery and improve search functionality.",
	icon: "HawkSearch.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "hawksearch:jsGlobal:0",
			kind: "jsGlobal",
			property: "HawkCompare.addImage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hawksearch:jsGlobal:1",
			kind: "jsGlobal",
			property: "HawkSearch.BaseUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hawksearch:jsGlobal:2",
			kind: "jsGlobal",
			property: "hawkIntervalSearch",
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
