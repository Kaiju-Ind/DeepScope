import type { TechnologyDefinition } from '../../types';

export const provideSupportTechnologyDefinition = {
	id: "provide-support",
	name: "Provide Support",
	website: "https://www.providesupport.com",
	description: "Provide Support is a SaaS for customer service that includes live chat, real-time website monitoring, chat statistics.",
	icon: "Provide Support.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "provide-support:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.providesupport\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
