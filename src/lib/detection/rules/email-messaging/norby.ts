import type { TechnologyDefinition } from '../../types';

export const norbyTechnologyDefinition = {
	id: "norby",
	name: "Norby",
	website: "https://norby.io",
	description: "Norby is an AI-powered chat solution catering to ecommerce, healthcare, crypto, and fintech industries.",
	icon: "NorbyAI.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "norby:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chat\\.norby\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "norby:jsGlobal:1",
			kind: "jsGlobal",
			property: "norbyChat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
