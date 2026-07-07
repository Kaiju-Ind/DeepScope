import type { TechnologyDefinition } from '../../types';

export const rofofkTechnologyDefinition = {
	id: "rofofk",
	name: "Rofofk",
	website: "https://rofofk.com",
	description: "Rofofk is an Arabic multi-tenant e-commerce SaaS platform.",
	icon: "Rofofk.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rofofk:jsGlobal:0",
			kind: "jsGlobal",
			property: "Rofofk",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rofofk:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Rofofk", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "rofofk:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Rofofk", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rofofk:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("rofofk", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "rofofk:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("rofofk", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
