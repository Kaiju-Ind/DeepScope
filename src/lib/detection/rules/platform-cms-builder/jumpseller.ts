import type { TechnologyDefinition } from '../../types';

export const jumpsellerTechnologyDefinition = {
	id: "jumpseller",
	name: "Jumpseller",
	website: "https://jumpseller.com",
	description: "Jumpseller is a cloud ecommerce solution for small businesses.",
	icon: "Jumpseller.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "jumpseller:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.jumpseller\\.\\w+\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jumpseller:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("jumpseller-apps\\.herokuapp\\.\\w+\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jumpseller:jsGlobal:2",
			kind: "jsGlobal",
			property: "Jumpseller",
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
