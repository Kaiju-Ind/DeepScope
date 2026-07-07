import type { TechnologyDefinition } from '../../types';

export const ometricsTechnologyDefinition = {
	id: "ometrics",
	name: "Ometrics",
	website: "https://www.ometrics.com",
	description: "Ometrics is an AI chatbot solution that engages website visitors by understanding queries and delivering helpful responses.",
	icon: "Ometrics.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "ometrics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.ometrics\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ometrics:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ometrics.Animation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ometrics:jsGlobal:2",
			kind: "jsGlobal",
			property: "OmetricsBody",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
