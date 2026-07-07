import type { TechnologyDefinition } from '../../types';

export const manulaTechnologyDefinition = {
	id: "manula",
	name: "Manula",
	website: "https://www.manula.com",
	description: "Manula is an online software for creating user manuals.",
	icon: "Manula.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "manula:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.manula\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "manula:jsGlobal:1",
			kind: "jsGlobal",
			property: "ManulaWebProductVersionCookiePath",
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
