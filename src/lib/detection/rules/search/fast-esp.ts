import type { TechnologyDefinition } from '../../types';

export const fastEspTechnologyDefinition = {
	id: "fast-esp",
	name: "FAST ESP",
	website: "https://microsoft.com/enterprisesearch",
	description: "FAST ESP is a service-oriented architecture development platform which is geared towards production searchable indexes. It provided a flexible framework for creating ETL applications for efficient indexing of searchable content.",
	icon: "FAST ESP.png",
	categories: [
		"search",
	],
	rules: [
		{
			id: "fast-esp:html:0",
			kind: "html",
			pattern: new RegExp("<form[^>]+id=\"fastsearch\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "fast-esp:dom:1",
			kind: "dom",
			selector: "form[id^='fastsearch']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
