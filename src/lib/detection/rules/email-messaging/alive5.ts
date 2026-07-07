import type { TechnologyDefinition } from '../../types';

export const alive5TechnologyDefinition = {
	id: "alive5",
	name: "Alive5",
	website: "https://www.alive5.com",
	description: "Alive5 is a unified inbox for teams, handling SMS, web chat, and social conversations. It was formerly known as Website Alive.",
	icon: "Alive5.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "alive5:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.websitealive\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "alive5:jsGlobal:1",
			kind: "jsGlobal",
			property: "alive5_environment",
			description: "Page-owned global matches a known technology marker.",
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
