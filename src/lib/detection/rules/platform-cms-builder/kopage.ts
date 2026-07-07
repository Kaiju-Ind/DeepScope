import type { TechnologyDefinition } from '../../types';

export const kopageTechnologyDefinition = {
	id: "kopage",
	name: "Kopage",
	website: "https://www.kopage.com",
	description: "Kopage is an AI-powered website builder designed to simplify the process of creating and managing websites, offering automated tools and features that enable users to build functional websites without extensive technical knowledge.",
	icon: "Kopage.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kopage:jsGlobal:0",
			kind: "jsGlobal",
			property: "kopageBar",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kopage:jsGlobal:1",
			kind: "jsGlobal",
			property: "kopageChatBar",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
