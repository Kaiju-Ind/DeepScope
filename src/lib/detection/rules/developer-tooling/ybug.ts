import type { TechnologyDefinition } from '../../types';

export const ybugTechnologyDefinition = {
	id: "ybug",
	name: "Ybug",
	website: "https://ybug.io",
	description: "Ybug is a visual feedback and bug tracking tool designed for users and clients, enabling identification and reporting of issues.",
	icon: "Ybug.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "ybug:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ybug\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ybug:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ybug",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ybug:jsGlobal:2",
			kind: "jsGlobal",
			property: "ybug_settings",
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
