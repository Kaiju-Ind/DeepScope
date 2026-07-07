import type { TechnologyDefinition } from '../../types';

export const elggTechnologyDefinition = {
	id: "elgg",
	name: "Elgg",
	website: "https://elgg.org/",
	description: "Elgg is a social networking engine, delivering the building blocks for creating social networks and applications.",
	icon: "Elgg.svg",
	categories: [
		"platform-cms-builder",
		"community-ugc",
	],
	rules: [
		{
			id: "elgg:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("elgg(?:_dataTables)?(?:\\/Ajax)?(?:\\/Plugin)?(?:\\/require_config)?(?:\\/spinner)?(?:\\/dev)?(?:\\.\\w{0,10})?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "elgg:jsGlobal:1",
			kind: "jsGlobal",
			property: "elgg",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elgg:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("elgg(?:_datatables)?(?:\\/ajax)?(?:\\/plugin)?(?:\\/require_config)?(?:\\/spinner)?(?:\\/dev)?(?:\\.\\w{0,10})?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "elgg:jsGlobal:3",
			kind: "jsGlobal",
			property: "elgg.ElggEntity",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:elgg:elgg:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
