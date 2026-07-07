import type { TechnologyDefinition } from '../../types';

export const onsipTechnologyDefinition = {
	id: "onsip",
	name: "OnSip",
	website: "https://www.onsip.com",
	description: "OnSip is a hosted VoIP solution that includes website chat functionality for business communication.",
	icon: "OnSip.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "onsip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.onsip\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "onsip:jsGlobal:1",
			kind: "jsGlobal",
			property: "Onsip",
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
