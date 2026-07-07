import type { TechnologyDefinition } from '../../types';

export const typesenseTechnologyDefinition = {
	id: "typesense",
	name: "Typesense",
	website: "https://typesense.org",
	description: "Typesense is an open-source, typo-tolerant search-engine optimized for speed and relevance.",
	icon: "Typesense.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "typesense:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/typesense@([\\d\\.]+)\\/dist\\/typesense\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "typesense:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("typesense-api"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "typesense:dom:2",
			kind: "dom",
			selector: "section[data-version*='typesense']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "typesense:jsGlobal:3",
			kind: "jsGlobal",
			property: "Typesense",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "typesense:jsGlobal:4",
			kind: "jsGlobal",
			property: "typesenseBlogPostCollection",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "typesense:jsGlobal:5",
			kind: "jsGlobal",
			property: "typesenseHost",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "typesense:jsGlobal:6",
			kind: "jsGlobal",
			property: "typesenseSearchKey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "typesense:jsGlobal:7",
			kind: "jsGlobal",
			property: "typesenseSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
