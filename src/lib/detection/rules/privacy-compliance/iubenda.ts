import type { TechnologyDefinition } from '../../types';

export const iubendaTechnologyDefinition = {
	id: "iubenda",
	name: "iubenda",
	website: "https://www.iubenda.com",
	description: "iubenda is a compliance software used by businesses for their websites and apps.",
	icon: "iubenda.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "iubenda:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("iubenda\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "iubenda:jsGlobal:1",
			kind: "jsGlobal",
			property: "_iub",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "iubenda:jsGlobal:2",
			kind: "jsGlobal",
			property: "addIubendaCs",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
