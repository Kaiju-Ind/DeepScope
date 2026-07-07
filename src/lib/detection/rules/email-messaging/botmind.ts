import type { TechnologyDefinition } from '../../types';

export const botmindTechnologyDefinition = {
	id: "botmind",
	name: "Botmind",
	website: "https://www.botmind.io",
	description: "Botmind is a software that automates responses to frequently asked questions.",
	icon: "Botmind.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "botmind:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.botmind\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "botmind:jsGlobal:1",
			kind: "jsGlobal",
			property: "botmindWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
