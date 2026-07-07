import type { TechnologyDefinition } from '../../types';

export const pubbleTechnologyDefinition = {
	id: "pubble",
	name: "Pubble",
	website: "https://www.pubble.io",
	description: "Pubble is a messaging platform that simplifies how teams interact with their customers.",
	icon: "Pubble.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "pubble:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pubble\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pubble:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pubble.Pubble",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pubble:jsGlobal:2",
			kind: "jsGlobal",
			property: "pubble_proActiveChat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pubble:jsGlobal:3",
			kind: "jsGlobal",
			property: "pubblebot",
			description: "Page-owned global matches a known technology marker.",
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
