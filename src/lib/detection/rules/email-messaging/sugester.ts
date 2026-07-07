import type { TechnologyDefinition } from '../../types';

export const sugesterTechnologyDefinition = {
	id: "sugester",
	name: "Sugester",
	website: "https://sugester.pl",
	description: "Sugester is a platform that combines CRM, helpdesk, and project management features, offering an all-in-one solution for small and medium-sized businesses.",
	icon: "Sugester.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "sugester:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sugester\\.pl\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sugester:jsGlobal:1",
			kind: "jsGlobal",
			property: "SUGESTER.ACCOUNT_ID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sugester:jsGlobal:2",
			kind: "jsGlobal",
			property: "sugesterChatOptions",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
