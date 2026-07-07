import type { TechnologyDefinition } from '../../types';

export const docusaurusTechnologyDefinition = {
	id: "docusaurus",
	name: "Docusaurus",
	website: "https://docusaurus.io/",
	description: "Docusaurus is a tool for teams to publish documentation websites.",
	icon: "docusaurus.svg",
	categories: [
		"content-publishing",
		"framework",
	],
	rules: [
		{
			id: "docusaurus:jsGlobal:0",
			kind: "jsGlobal",
			property: "__DOCUSAURUS_INSERT_BASEURL_BANNER",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "docusaurus:jsGlobal:1",
			kind: "jsGlobal",
			property: "docusaurus",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "docusaurus:jsGlobal:2",
			kind: "jsGlobal",
			property: "search.indexName",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "docusaurus:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Docusaurus(?: v(.+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "docusaurus:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^docusaurus(?: v(.+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"react",
		"webpack",
	],
} as const satisfies TechnologyDefinition;
