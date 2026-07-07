import type { TechnologyDefinition } from '../../types';

export const boldChatTechnologyDefinition = {
	id: "bold-chat",
	name: "Bold Chat",
	website: "https://www.boldchat.com/",
	description: "BoldChat is a live chat platform.",
	icon: "BoldChat.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "bold-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/vmss\\.boldchat\\.com\\/aid\\/\\d{18}\\/bc\\.vms4\\/vms\\.js"),
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
