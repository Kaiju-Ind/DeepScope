import type { TechnologyDefinition } from '../../types';

export const engatiTechnologyDefinition = {
	id: "engati",
	name: "Engati",
	website: "https://www.engati.com",
	description: "Engati is a chatbot platform that allows users to build bots without requiring programming skills.",
	icon: "Engati.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "engati:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.engati\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
