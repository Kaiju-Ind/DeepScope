import type { TechnologyDefinition } from '../../types';

export const interaktTechnologyDefinition = {
	id: "interakt",
	name: "Interakt",
	website: "https://www.interakt.shop",
	description: "Interakt is a messaging platform tailored for business communication, offering features such as secure messaging, file sharing, and customer support functionalities.",
	icon: "Interakt.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "interakt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.interakt\\.ai\\/"),
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
