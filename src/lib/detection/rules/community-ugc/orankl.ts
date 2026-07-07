import type { TechnologyDefinition } from '../../types';

export const oranklTechnologyDefinition = {
	id: "orankl",
	name: "Orankl",
	website: "https://www.orankl.com",
	description: "Orankl is a provider email marketing and review services.",
	icon: "Orankl.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "orankl:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.orankl\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "orankl:jsGlobal:1",
			kind: "jsGlobal",
			property: "Orankl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "orankl:jsGlobal:2",
			kind: "jsGlobal",
			property: "oranklInit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
