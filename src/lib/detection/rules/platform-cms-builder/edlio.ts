import type { TechnologyDefinition } from '../../types';

export const edlioTechnologyDefinition = {
	id: "edlio",
	name: "Edlio",
	website: "https://www.edlio.com",
	description: "Edlio is a platform that provides integrated K–12 teaching and communication solutions to support classroom management, student engagement, and school–home interaction.",
	icon: "Edlio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "edlio:jsGlobal:0",
			kind: "jsGlobal",
			property: "edlio.isEdgeToEdge",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "edlio:jsGlobal:1",
			kind: "jsGlobal",
			property: "edlioCorpDataLayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "edlio:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Edlio CMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "edlio:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^edlio cms$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
