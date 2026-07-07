import type { TechnologyDefinition } from '../../types';

export const poptinTechnologyDefinition = {
	id: "poptin",
	name: "Poptin",
	website: "https://www.poptin.com",
	description: "Poptin is a platform designed to engage visitors and coverts them into leads, subscribers and sales.",
	icon: "Poptin.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "poptin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.popt\\.in\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "poptin:jsGlobal:1",
			kind: "jsGlobal",
			property: "poptinAfterPageLoad",
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
