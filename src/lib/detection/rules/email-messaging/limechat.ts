import type { TechnologyDefinition } from '../../types';

export const limechatTechnologyDefinition = {
	id: "limechat",
	name: "LimeChat",
	website: "https://www.limechat.ai",
	description: "LimeChat is India's first level-3 AI chatbot company.",
	icon: "LimeChat.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "limechat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.limechat\\.ai\\/"),
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
