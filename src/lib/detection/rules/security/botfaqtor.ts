import type { TechnologyDefinition } from '../../types';

export const botfaqtorTechnologyDefinition = {
	id: "botfaqtor",
	name: "Botfaqtor",
	website: "https://botfaqtor.ru",
	description: "Botfaqtor is a cybersecurity platform that aims to mitigate bot traffic and click fraud using customizable filtering rules.",
	icon: "Botfaqtor.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "botfaqtor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.botfaqtor\\.ru"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "botfaqtor:jsGlobal:1",
			kind: "jsGlobal",
			property: "Botfaqtor",
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
