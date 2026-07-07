import type { TechnologyDefinition } from '../../types';

export const mailjetTechnologyDefinition = {
	id: "mailjet",
	name: "Mailjet",
	website: "https://www.mailjet.com/",
	description: "Mailjet is an email delivery service for marketing and developer teams.",
	icon: "Mailjet.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "mailjet:dns:0",
			kind: "dns",
			valuePattern: new RegExp("mailjet\\.com", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
