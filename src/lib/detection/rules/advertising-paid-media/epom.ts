import type { TechnologyDefinition } from '../../types';

export const epomTechnologyDefinition = {
	id: "epom",
	name: "Epom",
	website: "https://epom.com",
	description: "Epom is an ad serving and ad management platform for publishers, advertisers, and networks.",
	icon: "Epom.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "epom:url:0",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/(?:[^/]+\\.)?ad(?:op)?shost1\\.com\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "epom:jsGlobal:1",
			kind: "jsGlobal",
			property: "epomCustomParams",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
