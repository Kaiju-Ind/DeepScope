import type { TechnologyDefinition } from '../../types';

export const didarTechnologyDefinition = {
	id: "didar",
	name: "Didar",
	website: "https://didar.me",
	description: "Didar is a platform offering tools for managing relationships and enhancing sales.",
	icon: "Didar.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "didar:jsGlobal:0",
			kind: "jsGlobal",
			property: "webpackChunkdidarx",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "didar:meta:1",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("^Didar CRM$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "didar:meta:2",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("^didar crm$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
