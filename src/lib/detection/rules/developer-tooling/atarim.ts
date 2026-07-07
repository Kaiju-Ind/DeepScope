import type { TechnologyDefinition } from '../../types';

export const atarimTechnologyDefinition = {
	id: "atarim",
	name: "Atarim",
	website: "https://atarim.io",
	description: "Atarim is an AI-based platform that enhances websites through an agentic creative system covering design, UX, SEO, copywriting, accessibility, and related optimization tasks.",
	icon: "Atarim.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "atarim:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.atarimworker\\.dev"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "atarim:jsGlobal:1",
			kind: "jsGlobal",
			property: "ATARIM.file",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "atarim:jsGlobal:2",
			kind: "jsGlobal",
			property: "atarimUI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "atarim:jsGlobal:3",
			kind: "jsGlobal",
			property: "atarim_server_down",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
