import type { TechnologyDefinition } from '../../types';

export const tiledeskTechnologyDefinition = {
	id: "tiledesk",
	name: "Tiledesk",
	website: "https://tiledesk.com",
	description: "Tiledesk is a multi-channel agentic AI platform for customer service, combining human handover, self-learning, and no-code visual automations.”",
	icon: "Tiledesk.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "tiledesk:jsGlobal:0",
			kind: "jsGlobal",
			property: "Tiledesk",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tiledesk:jsGlobal:1",
			kind: "jsGlobal",
			property: "tileDeskAsyncInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tiledesk:jsGlobal:2",
			kind: "jsGlobal",
			property: "tiledesk",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tiledesk:jsGlobal:3",
			kind: "jsGlobal",
			property: "tiledeskSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
