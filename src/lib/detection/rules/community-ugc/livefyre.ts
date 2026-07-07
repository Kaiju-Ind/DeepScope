import type { TechnologyDefinition } from '../../types';

export const livefyreTechnologyDefinition = {
	id: "livefyre",
	name: "Livefyre",
	website: "https://livefyre.com",
	description: "Livefyre is a platform that integrates with the social web to boost social interaction.",
	icon: "Livefyre.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "livefyre:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("livefyre_init\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "livefyre:html:1",
			kind: "html",
			pattern: new RegExp("<[^>]+(?:id|class)=\"livefyre"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "livefyre:jsGlobal:2",
			kind: "jsGlobal",
			property: "FyreLoader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "livefyre:jsGlobal:3",
			kind: "jsGlobal",
			property: "L.version",
			valuePattern: new RegExp("^(.+)$"),
			confidence: 0,
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "livefyre:jsGlobal:4",
			kind: "jsGlobal",
			property: "LF.CommentCount",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "livefyre:jsGlobal:5",
			kind: "jsGlobal",
			property: "fyre",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
