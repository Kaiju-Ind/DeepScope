import type { TechnologyDefinition } from '../../types';

export const annotoTechnologyDefinition = {
	id: "annoto",
	name: "Annoto",
	website: "https://www.annoto.net",
	description: "Annoto is a platform that transforms video viewing into an interactive, social, and collaborative experience rather than a passive individual activity.",
	icon: "Annoto.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "annoto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.annoto\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "annoto:jsGlobal:1",
			kind: "jsGlobal",
			property: "Annoto.boot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "annoto:jsGlobal:2",
			kind: "jsGlobal",
			property: "AnnotoApiPromise",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
