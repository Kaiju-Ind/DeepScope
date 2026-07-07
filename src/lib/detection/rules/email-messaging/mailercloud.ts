import type { TechnologyDefinition } from '../../types';

export const mailercloudTechnologyDefinition = {
	id: "mailercloud",
	name: "Mailercloud",
	website: "https://www.mailercloud.com/",
	description: "Mailercloud is an email marketing platform that offers tools for creating, sending, and tracking email campaigns, including automation, contact segmentation, and detailed analytics.",
	icon: "Mailercloud.svg",
	categories: [
		"email-messaging",
		"marketing-automation",
	],
	rules: [
		{
			id: "mailercloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mailercloud\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
