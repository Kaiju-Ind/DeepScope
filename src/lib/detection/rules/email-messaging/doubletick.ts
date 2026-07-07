import type { TechnologyDefinition } from '../../types';

export const doubletickTechnologyDefinition = {
	id: "doubletick",
	name: "DoubleTick",
	website: "https://doubletick.io",
	description: "DoubleTick is a phone-based WhatsApp API for B2C and B2B sales, enabling bulk messaging, chatbots, and order booking.",
	icon: "DoubleTick.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "doubletick:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.doubletick\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "doubletick:jsGlobal:1",
			kind: "jsGlobal",
			property: "dt.resetConfig",
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
