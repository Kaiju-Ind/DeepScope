import type { TechnologyDefinition } from '../../types';

export const czaterTechnologyDefinition = {
	id: "czater",
	name: "Czater",
	website: "https://www.czater.pl",
	description: "Czater is an live chat solution with extended CRM and videochat features.",
	icon: "Czater.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "czater:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.czater\\.pl"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "czater:jsGlobal:1",
			kind: "jsGlobal",
			property: "$czater",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "czater:jsGlobal:2",
			kind: "jsGlobal",
			property: "$czaterMethods",
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
