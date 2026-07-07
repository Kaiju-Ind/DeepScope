import type { TechnologyDefinition } from '../../types';

export const merlinTechnologyDefinition = {
	id: "merlin",
	name: "Merlin",
	website: "https://gomerlin.com.br",
	description: "Merlin is a platform that builds bots for interactive visitor, lead, and customer engagement, integrating with tools and databases to automate processes and improve lead conversion without requiring a developer.",
	icon: "Merlin.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "merlin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\.gomerlin\\.com\\.br"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "merlin:jsGlobal:1",
			kind: "jsGlobal",
			property: "Merlin.Chat",
			description: "Page-owned global matches a known technology marker.",
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
