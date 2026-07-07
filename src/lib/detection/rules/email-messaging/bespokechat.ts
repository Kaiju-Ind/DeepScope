import type { TechnologyDefinition } from '../../types';

export const bespokechatTechnologyDefinition = {
	id: "bespokechat",
	name: "BespokeChat",
	website: "https://www.bespokechat.com",
	description: "BespokeChat is a Polish-developed chat solution designed to support real-time online communication.",
	icon: "BespokeChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "bespokechat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.bespokechat\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
