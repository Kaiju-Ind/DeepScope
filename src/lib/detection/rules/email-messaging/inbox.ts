import type { TechnologyDefinition } from '../../types';

export const inboxTechnologyDefinition = {
	id: "inbox",
	name: "INBOX",
	website: "https://useinbox.com",
	description: "INBOX is an email marketing system designed to create, manage, and track email campaigns for communication, promotions, or newsletters.",
	icon: "UseInbox.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "inbox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.useinbox\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "inbox:dom:1",
			kind: "dom",
			selector: "form[action*='app.useinbox.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
