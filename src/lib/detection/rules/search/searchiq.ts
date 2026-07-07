import type { TechnologyDefinition } from '../../types';

export const searchiqTechnologyDefinition = {
	id: "searchiq",
	name: "SearchiQ",
	website: "https://www.searchiq.co",
	description: "SearchiQ is a cloud-based search engine solution that can be integrated into a website.",
	icon: "SearchiQ.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "searchiq:jsGlobal:0",
			kind: "jsGlobal",
			property: "siqConfig.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "searchiq:jsGlobal:1",
			kind: "jsGlobal",
			property: "siq_version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
