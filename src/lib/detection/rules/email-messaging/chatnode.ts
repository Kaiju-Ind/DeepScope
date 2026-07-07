import type { TechnologyDefinition } from '../../types';

export const chatnodeTechnologyDefinition = {
	id: "chatnode",
	name: "ChatNode",
	website: "https://www.chatnode.ai",
	description: "ChatNode is a platform for building advanced AI chatbots that provide deep business insights, designed to enhance customer interactions through innovative technology.",
	icon: "ChatNode.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "chatnode:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.chatnode\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
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
