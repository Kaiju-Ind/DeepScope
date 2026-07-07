import type { TechnologyDefinition } from '../../types';

export const wikitLiveChatTechnologyDefinition = {
	id: "wikit-live-chat",
	name: "Wikit Live Chat",
	website: "https://www.wikit.ai/solution/livechat",
	description: "Wikit Live Chat is a platform that enables the creation of intelligent chatbots, leveraging the capabilities of generative AI to enhance user interactions.",
	icon: "Wikit.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "wikit-live-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("webchat\\.wikit\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
