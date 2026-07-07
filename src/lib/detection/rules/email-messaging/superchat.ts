import type { TechnologyDefinition } from '../../types';

export const superchatTechnologyDefinition = {
	id: "superchat",
	name: "Superchat",
	website: "https://www.superchat.com/",
	description: "Superchat is an all-in-one messaging software that helps businesses build loyal customer relationships, send and automate newsletters, sell products, and answer questions.",
	icon: "Superchat.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "superchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.superchat\\.de\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "superchat:jsGlobal:1",
			kind: "jsGlobal",
			property: "Superchat.init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
