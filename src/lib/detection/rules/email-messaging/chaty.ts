import type { TechnologyDefinition } from '../../types';

export const chatyTechnologyDefinition = {
	id: "chaty",
	name: "Chaty",
	website: "https://chaty.app/",
	description: "Chaty is a communication tool that enables customer engagement through messaging apps like WhatsApp and Messenger.",
	icon: "Chaty.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chaty:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.chaty\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chaty:jsGlobal:1",
			kind: "jsGlobal",
			property: "close_chaty",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chaty:jsGlobal:2",
			kind: "jsGlobal",
			property: "launch_chaty",
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
