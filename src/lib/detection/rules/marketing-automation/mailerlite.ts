import type { TechnologyDefinition } from '../../types';

export const mailerliteTechnologyDefinition = {
	id: "mailerlite",
	name: "MailerLite",
	website: "https://www.mailerlite.com",
	description: "MailerLite is an email marketing tool and website builder for businesses of all shapes and sizes.",
	icon: "MailerLite.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "mailerlite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mailerlite\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mailerlite:dom:1",
			kind: "dom",
			selector: "link[href*='.mailerlite.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mailerlite:jsGlobal:2",
			kind: "jsGlobal",
			property: "MailerLiteObject",
			description: "Page-owned global matches a known technology marker.",
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
