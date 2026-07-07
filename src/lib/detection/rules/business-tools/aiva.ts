import type { TechnologyDefinition } from '../../types';

export const aivaTechnologyDefinition = {
	id: "aiva",
	name: "Aiva",
	website: "https://hireaiva.com",
	description: "Aiva is a real estate lead conversion platform that qualifies and engages leads 24/7.",
	icon: "Aiva.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "aiva:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hireaiva\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aiva:jsGlobal:1",
			kind: "jsGlobal",
			property: "__AivaLiveChat",
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
