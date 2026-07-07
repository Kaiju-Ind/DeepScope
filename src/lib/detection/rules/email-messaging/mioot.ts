import type { TechnologyDefinition } from '../../types';

export const miootTechnologyDefinition = {
	id: "mioot",
	name: "Mioot",
	website: "https://mioot.com",
	description: "Mioot is a live chat software that facilitates real-time communication between service agents and customers on digital platforms.",
	icon: "Mioot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "mioot:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.mioot\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "mioot:jsGlobal:1",
			kind: "jsGlobal",
			property: "miootChat.addTicket",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mioot:jsGlobal:2",
			kind: "jsGlobal",
			property: "miootFunctions",
			description: "Page-owned global matches a known technology marker.",
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
