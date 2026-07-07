import type { TechnologyDefinition } from '../../types';

export const callbellTechnologyDefinition = {
	id: "callbell",
	name: "Callbell",
	website: "https://www.callbell.eu",
	description: "Callbell is a web-based live chat solution designed to help businesses manage team collaboration via multiple communication channels.",
	icon: "Callbell.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "callbell:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.callbell\\.eu\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "callbell:jsGlobal:1",
			kind: "jsGlobal",
			property: "Callbell",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "callbell:jsGlobal:2",
			kind: "jsGlobal",
			property: "callbellSettings",
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
