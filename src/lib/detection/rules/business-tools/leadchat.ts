import type { TechnologyDefinition } from '../../types';

export const leadchatTechnologyDefinition = {
	id: "leadchat",
	name: "LeadChat",
	website: "https://www.leadchat.com",
	description: "LeadChat offers live-operators and CRM solutions that utilise LiveChat chat software to facilitate real-time engagement with website visitors for businesses.",
	icon: "LeadChat.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "leadchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/\\/|\\.)chatsystem\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"poa",
			"recurring",
		],
	},
	requires: [
		"livechat",
	],
} as const satisfies TechnologyDefinition;
