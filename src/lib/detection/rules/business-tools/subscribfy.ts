import type { TechnologyDefinition } from '../../types';

export const subscribfyTechnologyDefinition = {
	id: "subscribfy",
	name: "Subscribfy",
	website: "https://subscribfy.ai",
	description: "Subscribfy is a platform that enables users to organize, track, and manage their subscriptions in one place.",
	icon: "Subscribfy.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "subscribfy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app1\\.subscribfy\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "subscribfy:jsGlobal:1",
			kind: "jsGlobal",
			property: "SUBSCRIBFYFASTMODE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "subscribfy:jsGlobal:2",
			kind: "jsGlobal",
			property: "SUBSCRIBFY_CLR",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
