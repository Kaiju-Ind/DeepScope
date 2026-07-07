import type { TechnologyDefinition } from '../../types';

export const ivorySearchTechnologyDefinition = {
	id: "ivory-search",
	name: "Ivory Search",
	website: "https://ivorysearch.com",
	description: "Ivory Search is a WordPress search plugin that improves WordPress search by providing advanced options to extend search or exclude specific content from search.",
	icon: "ivory_searc.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "ivory-search:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/add-search-to-menu\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ivory-search:jsGlobal:1",
			kind: "jsGlobal",
			property: "IvorySearchVars",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ivory-search:jsGlobal:2",
			kind: "jsGlobal",
			property: "ivory_search_analytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:ivorysearch:ivory_search:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
