import type { TechnologyDefinition } from '../../types';

export const sendgridTechnologyDefinition = {
	id: "sendgrid",
	name: "Sendgrid",
	website: "https://sendgrid.com/",
	description: "SendGrid is a cloud-based email delivery platform for transactional and marketing emails.",
	icon: "SendGrid.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "sendgrid:dns:0",
			kind: "dns",
			valuePattern: new RegExp("sendgrid\\.net", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
