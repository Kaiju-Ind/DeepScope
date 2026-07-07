import type { TechnologyDefinition } from '../../types';

export const listagramTechnologyDefinition = {
	id: "listagram",
	name: "Listagram",
	website: "https://www.listagram.com",
	description: "Listagram is a list building tool which increases conversions by turning newsletter signups into a game.",
	icon: "Listagram.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "listagram:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.listagram\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "listagram:jsGlobal:1",
			kind: "jsGlobal",
			property: "LISTAGRAM.config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "listagram:jsGlobal:2",
			kind: "jsGlobal",
			property: "LISTAGRAM_CFG.base_api",
			valuePattern: new RegExp("www\\.listagram\\.com"),
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
