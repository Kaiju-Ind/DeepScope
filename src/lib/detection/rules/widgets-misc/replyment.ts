import type { TechnologyDefinition } from '../../types';

export const replymentTechnologyDefinition = {
	id: "replyment",
	name: "Replyment",
	website: "https://replyment.com",
	description: "Engage with your customers effortlessly on their preferred messaging app using Replyment, including WhatsApp, Messenger, and more. We support 20+ apps and platforms for seamless engagement.",
	icon: "Replyment.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "replyment:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.replyment\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
