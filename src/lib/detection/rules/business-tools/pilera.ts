import type { TechnologyDefinition } from '../../types';

export const pileraTechnologyDefinition = {
	id: "pilera",
	name: "Pilera",
	website: "https://www.pilera.com",
	description: "Pilera is a property management software platform that organizes community operations, resident communications, and maintenance activities.",
	icon: "Pilera.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "pilera:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.pilera\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "pilera:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pilera.logosRootUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pilera:jsGlobal:2",
			kind: "jsGlobal",
			property: "PileraBackboneCollection",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
