import type { TechnologyDefinition } from '../../types';

export const imobibrasilTechnologyDefinition = {
	id: "imobibrasil",
	name: "ImobiBrasil",
	website: "https://imobibrasil.com.br",
	description: "ImobiBrasil is a real estate CRM and sales funnel system that integrates with property portals to manage listings, leads, and client interactions within a centralized platform.",
	icon: "ImobiBrasil.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "imobibrasil:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.imobibrasil\\.app\\.br"),
			description: "Script content contains a bounded technology signature.",
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
