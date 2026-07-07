import type { TechnologyDefinition } from '../../types';

export const klaraTechnologyDefinition = {
	id: "klara",
	name: "Klara",
	website: "https://www.klara.com",
	description: "Klara is a healthcare communication platform that enables staff to communicate with patients and with each other.",
	icon: "Klara.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "klara:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.klara\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "klara:jsGlobal:1",
			kind: "jsGlobal",
			property: "klaraWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
