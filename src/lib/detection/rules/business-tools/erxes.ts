import type { TechnologyDefinition } from '../../types';

export const erxesTechnologyDefinition = {
	id: "erxes",
	name: "Erxes",
	website: "https://erxes.io",
	description: "Erxes is a platform that provides tools for marketing, sales, and customer service management.",
	icon: "Erxes.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "erxes:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp(".app\\.erxes\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "erxes:jsGlobal:1",
			kind: "jsGlobal",
			property: "Erxes.showMessenger",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "erxes:jsGlobal:2",
			kind: "jsGlobal",
			property: "erxesEnv",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:erxes:erxes:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
