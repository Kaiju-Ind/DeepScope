import type { TechnologyDefinition } from '../../types';

export const emailjsTechnologyDefinition = {
	id: "emailjs",
	name: "EmailJS",
	website: "https://www.emailjs.com",
	description: "EmailJS is a cloud-based email delivery service that allows you to send emails directly from your client-side JavaScript code without the need for a server-side implementation.",
	icon: "EmailJS.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "emailjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("([\\d\\.]+)?(?:\\/dist)?\\/email\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "emailjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "emailjs.sendForm",
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
