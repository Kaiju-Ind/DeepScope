import type { TechnologyDefinition } from '../../types';

export const hoowlaTechnologyDefinition = {
	id: "hoowla",
	name: "Hoowla",
	website: "https://www.hoowla.com",
	description: "Hoowla is a case management software designed to organize, track, and manage legal workflows and client information for law firms.",
	icon: "Hoowla.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "hoowla:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.hoowla\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hoowla:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.hoowla\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "hoowla:jsGlobal:2",
			kind: "jsGlobal",
			property: "hoowlainit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
