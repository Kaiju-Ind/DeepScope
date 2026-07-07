import type { TechnologyDefinition } from '../../types';

export const letSConnectTechnologyDefinition = {
	id: "let-s-connect",
	name: "Let's Connect",
	website: "https://www.letsconnect.at",
	description: "Let's Connect is a digital tool for businesses to manage customer interactions and communications.",
	icon: "LetsConnect.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "let-s-connect:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.letsconnect\\.at\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
