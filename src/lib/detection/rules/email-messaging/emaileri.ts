import type { TechnologyDefinition } from '../../types';

export const emaileriTechnologyDefinition = {
	id: "emaileri",
	name: "Emaileri",
	website: "https://www.emaileri.com",
	description: "Emaileri is a platform designed for email marketing and newsletter communications.",
	icon: "Emaileri.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "emaileri:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("static\\.emaileri\\.fi"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "emaileri:dom:1",
			kind: "dom",
			selector: "iframe[src*='static.emaileri.fi']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
