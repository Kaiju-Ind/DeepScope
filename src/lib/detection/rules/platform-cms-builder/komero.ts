import type { TechnologyDefinition } from '../../types';

export const komeroTechnologyDefinition = {
	id: "komero",
	name: "KOMERO",
	website: "https://www.komero.ge",
	description: "Multi-tenant SaaS e-commerce platform.",
	icon: "Komero.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "komero:jsGlobal:0",
			kind: "jsGlobal",
			property: "KOMERO",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "komero:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^KOMERO", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "komero:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^komero", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
