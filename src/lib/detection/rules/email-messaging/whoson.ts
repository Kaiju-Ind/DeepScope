import type { TechnologyDefinition } from '../../types';

export const whosonTechnologyDefinition = {
	id: "whoson",
	name: "WhosOn",
	website: "https://www.whoson.com",
	description: "WhosOn is a secure live chat and AI platform for managing and automating customer communications.",
	icon: "WhosOn.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "whoson:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.whoson\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "whoson:jsGlobal:1",
			kind: "jsGlobal",
			property: "whoson_global",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "whoson:jsGlobal:2",
			kind: "jsGlobal",
			property: "whoson_init",
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
