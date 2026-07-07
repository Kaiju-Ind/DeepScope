import type { TechnologyDefinition } from '../../types';

export const liscioTechnologyDefinition = {
	id: "liscio",
	name: "Liscio",
	website: "https://www.liscio.me",
	description: "Liscio is an AI assistant for accounting firms that supports client communication, task coordination, and document workflows to help manage accounting operations.",
	icon: "Liscio.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "liscio:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.liscio\\.me\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "liscio:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunkliscio_ui.push",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
