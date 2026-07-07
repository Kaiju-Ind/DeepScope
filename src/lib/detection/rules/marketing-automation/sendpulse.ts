import type { TechnologyDefinition } from '../../types';

export const sendpulseTechnologyDefinition = {
	id: "sendpulse",
	name: "SendPulse",
	website: "https://sendpulse.com",
	description: "SendPulse is an email marketing platform with additional channels: SMS, web push notifications, Facebook and WhatsApp chatbots.",
	icon: "SendPulse.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "sendpulse:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sendpulse\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sendpulse:dom:1",
			kind: "dom",
			selector: "link[href*='.sendpulse.com']",
			description: "DOM selector matches a known technology marker.",
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
