import type { TechnologyDefinition } from '../../types';

export const mailgunTechnologyDefinition = {
	id: "mailgun",
	name: "Mailgun",
	website: "https://www.mailgun.com/",
	description: "Mailgun is a transactional email API service for developers.",
	icon: "Mailgun.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "mailgun:dns:0",
			kind: "dns",
			valuePattern: new RegExp("mailgun\\.org", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
