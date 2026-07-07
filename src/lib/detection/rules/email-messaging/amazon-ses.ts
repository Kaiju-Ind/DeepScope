import type { TechnologyDefinition } from '../../types';

export const amazonSesTechnologyDefinition = {
	id: "amazon-ses",
	name: "Amazon SES",
	website: "https://aws.amazon.com/ses/",
	description: "Amazon Simple Email Service (SES) is an email service that enables developers to send mail from within any application.",
	icon: "Amazon SES.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "amazon-ses:dns:0",
			kind: "dns",
			valuePattern: new RegExp("amazonses\\.com", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"amazon-web-services",
	],
} as const satisfies TechnologyDefinition;
