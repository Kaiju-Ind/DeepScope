import type { TechnologyDefinition } from '../../types';

export const messagemediaTechnologyDefinition = {
	id: "messagemedia",
	name: "MessageMedia",
	website: "https://messagemedia.com",
	description: "MessageMedia is a software service provider that helps businesses communicate with their customers and other contacts using SMS messages.",
	icon: "MessageMedia.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "messagemedia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chatwidget\\.messagemedia\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
