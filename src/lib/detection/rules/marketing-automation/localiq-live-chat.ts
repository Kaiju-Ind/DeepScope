import type { TechnologyDefinition } from '../../types';

export const localiqLiveChatTechnologyDefinition = {
	id: "localiq-live-chat",
	name: "LocaliQ Live Chat",
	website: "https://localiq.com",
	description: "LocaliQ Live Chat is a customer support tool that enables real-time responses to questions while capturing essential customer information.",
	icon: "LocaliQ.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "localiq-live-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.reachlocallivechat\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
