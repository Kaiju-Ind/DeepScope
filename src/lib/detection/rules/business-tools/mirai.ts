import type { TechnologyDefinition } from '../../types';

export const miraiTechnologyDefinition = {
	id: "mirai",
	name: "Mirai",
	website: "https://www.mirai.com",
	description: "Mirai is a hotel management system.",
	icon: "Mirai.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "mirai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mirai\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mirai:jsGlobal:1",
			kind: "jsGlobal",
			property: "Mirai",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
