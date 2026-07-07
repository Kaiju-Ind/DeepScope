import type { TechnologyDefinition } from '../../types';

export const sendtexTechnologyDefinition = {
	id: "sendtex",
	name: "Sendtex",
	website: "https://sendpad.com",
	description: "Sendtex is an email marketing platform designed to facilitate the creation, management, and distribution of email campaigns.",
	icon: "Sendpad.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "sendtex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.sendpad\\.com"),
			description: "Script source URL matches a known technology marker.",
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
