import type { TechnologyDefinition } from '../../types';

export const jirafeTechnologyDefinition = {
	id: "jirafe",
	name: "Jirafe",
	website: "https://docs.jirafe.com",
	icon: "Jirafe.png",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "jirafe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jirafe\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jirafe:jsGlobal:1",
			kind: "jsGlobal",
			property: "jirafe",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
