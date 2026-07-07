import type { TechnologyDefinition } from '../../types';

export const hiverTechnologyDefinition = {
	id: "hiver",
	name: "Hiver",
	website: "https://hiverhq.com",
	description: "Hiver is a tool that transforms Gmail into a collaboration and customer support system.",
	icon: "Hiver.svg",
	categories: [
		"business-tools",
		"email-messaging",
	],
	rules: [
		{
			id: "hiver:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chat-widget\\.hiverhq\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hiver:dom:1",
			kind: "dom",
			selector: "link[href*='chat-widget.hiverhq.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "hiver:jsGlobal:2",
			kind: "jsGlobal",
			property: "$hiverChatWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
