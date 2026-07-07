import type { TechnologyDefinition } from '../../types';

export const centribalTechnologyDefinition = {
	id: "centribal",
	name: "Centribal",
	website: "https://centribal.com",
	description: "Centribal is a conversational platform designed for creating, managing, and training chatbots.",
	icon: "Centribal.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "centribal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.centribal\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "centribal:jsGlobal:1",
			kind: "jsGlobal",
			property: "centribot_services",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
