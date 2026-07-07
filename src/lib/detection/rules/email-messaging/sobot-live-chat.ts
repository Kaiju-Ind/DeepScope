import type { TechnologyDefinition } from '../../types';

export const sobotLiveChatTechnologyDefinition = {
	id: "sobot-live-chat",
	name: "Sobot Live Chat",
	website: "https://www.sobot.io",
	description: "Sobot Live Chat is a platform for instant customer engagement, enabling real-time communication on a single interface.",
	icon: "Sobot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "sobot-live-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sobot\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sobot-live-chat:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.sobot\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
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
