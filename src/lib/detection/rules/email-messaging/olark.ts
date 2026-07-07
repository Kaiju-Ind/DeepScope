import type { TechnologyDefinition } from '../../types';

export const olarkTechnologyDefinition = {
	id: "olark",
	name: "Olark",
	website: "https://www.olark.com/",
	description: "Olark is a cloud-based live chat solution.",
	icon: "Olark.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "olark:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.olark\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "olark:jsGlobal:1",
			kind: "jsGlobal",
			property: "olark",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "olark:jsGlobal:2",
			kind: "jsGlobal",
			property: "olarkUserData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
