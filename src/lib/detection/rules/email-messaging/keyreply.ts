import type { TechnologyDefinition } from '../../types';

export const keyreplyTechnologyDefinition = {
	id: "keyreply",
	name: "KeyReply",
	website: "https://www.keyreply.com",
	description: "KeyReply is a mobile-friendly chat widget that enables websites to provide real-time messaging and user support across devices.",
	icon: "KeyReply.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "keyreply:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("keyreply\\.com\\/chat\\/widget\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "keyreply:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\keyreply\\.com\\/chat\\/widget\\.js"),
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
