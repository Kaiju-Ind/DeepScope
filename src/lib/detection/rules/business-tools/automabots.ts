import type { TechnologyDefinition } from '../../types';

export const automabotsTechnologyDefinition = {
	id: "automabots",
	name: "Automabots",
	website: "https://automabots.com",
	description: "Automabots is an automated intelligent workforce designed to match home buyers with suitable properties.",
	icon: "Automabots.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "automabots:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.automabots\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "automabots:jsGlobal:1",
			kind: "jsGlobal",
			property: "automabots.appRoot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "automabots:jsGlobal:2",
			kind: "jsGlobal",
			property: "automabotsWebpackJsonp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
