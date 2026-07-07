import type { TechnologyDefinition } from '../../types';

export const storenvyTechnologyDefinition = {
	id: "storenvy",
	name: "Storenvy",
	website: "https://www.storenvy.com",
	description: "Storenvy is a social commerce platform that hosts independent sellers and enables the listing, discovery, and purchase of small-brand products within a community-driven marketplace.",
	icon: "Storenvy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "storenvy:jsGlobal:0",
			kind: "jsGlobal",
			property: "Storenvy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "storenvy:jsGlobal:1",
			kind: "jsGlobal",
			property: "StorenvyCartComm.addToCart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "storenvy:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Storenvy$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "storenvy:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^storenvy$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
