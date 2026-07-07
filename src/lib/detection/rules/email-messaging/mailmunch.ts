import type { TechnologyDefinition } from '../../types';

export const mailmunchTechnologyDefinition = {
	id: "mailmunch",
	name: "Mailmunch",
	website: "https://www.mailmunch.com",
	description: "Mailmunch is a lead generation tool that combines landing pages, forms, and email marketing.",
	icon: "Mailmunch.svg",
	categories: [
		"email-messaging",
		"marketing-automation",
	],
	rules: [
		{
			id: "mailmunch:jsGlobal:0",
			kind: "jsGlobal",
			property: "MailMunchWidgets",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mailmunch:jsGlobal:1",
			kind: "jsGlobal",
			property: "mailmunch",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
