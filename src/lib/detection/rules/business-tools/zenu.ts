import type { TechnologyDefinition } from '../../types';

export const zenuTechnologyDefinition = {
	id: "zenu",
	name: "Zenu",
	website: "https://www.zenu.com.au",
	description: "Zenu is an all-in-one CRM solution designed to manage real estate operations, including client interactions, property listings, and sales processes.",
	icon: "Zenu.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "zenu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.zenu\\.com\\.au"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zenu:jsGlobal:1",
			kind: "jsGlobal",
			property: "zenuDebug",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zenu:jsGlobal:2",
			kind: "jsGlobal",
			property: "zenuHp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
