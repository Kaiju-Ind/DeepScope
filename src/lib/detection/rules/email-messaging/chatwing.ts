import type { TechnologyDefinition } from '../../types';

export const chatwingTechnologyDefinition = {
	id: "chatwing",
	name: "ChatWING",
	website: "https://chatwing.com",
	description: "ChatWING is a live website chat system designed to facilitate real-time communication between businesses and website visitors.",
	icon: "ChatWING.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatwing:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.chatwing\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "chatwing:dom:1",
			kind: "dom",
			selector: "iframe[src*='chatwing.com/chatbox/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "chatwing:jsGlobal:2",
			kind: "jsGlobal",
			property: "chatwing.browser",
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
